// Extracts the actual encrypt/decrypt functions from text-encryptor.html
// (regex-scoped to just the function bodies, no eval of the whole page)
// and round-trip tests each of the 4 algorithms against real inputs.
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('/Users/keynote/Documents/GitHub/modoo-tool/text-encryptor.html', 'utf8');
const scriptMatch = html.match(/<script>\nconst ALGOS[\s\S]*?<\/script>/);
if (!scriptMatch) { console.error('FAIL: could not locate main script block'); process.exit(1); }
const src = scriptMatch[0].replace(/^<script>\n/, '').replace(/<\/script>$/, '');

// Only need the pure algorithm functions; stub out the DOM-touching tail.
const fnNames = ['rot13','caesar','caesarDec','vigenere','vigenereDecrypt','aesEncrypt','aesDecrypt'];
const fnSrcs = fnNames.map(name => {
  const re = new RegExp('(async\\s+)?function\\s+' + name + '\\([\\s\\S]*?\\n\\}', 'm');
  const m = src.match(re);
  if (!m) throw new Error('missing function ' + name);
  return m[0];
});

const sandbox = { crypto, btoa, atob, TextEncoder, TextDecoder, Uint8Array, console };
vm.createContext(sandbox);
vm.runInContext(fnSrcs.join('\n\n') + '\nglobalThis.__fns = {rot13,caesar,caesarDec,vigenere,vigenereDecrypt,aesEncrypt,aesDecrypt};', sandbox);
const { rot13, caesar, caesarDec, vigenere, vigenereDecrypt, aesEncrypt, aesDecrypt } = sandbox.__fns;

let pass = 0, fail = 0;
function check(name, ok, detail) {
  if (ok) { pass++; console.log('PASS', name); }
  else { fail++; console.log('FAIL', name, detail || ''); }
}

const plain = 'Hello 안녕하세요 123!';

// ROT13: self-inverse
check('ROT13 round-trip', rot13(rot13(plain)) === plain);

// Caesar: encrypt with shift n, decrypt with same n
for (const n of [1, 3, 13, 25]) {
  const enc = caesar(plain, n);
  const dec = caesarDec(enc, n);
  check(`Caesar shift=${n} round-trip`, dec === plain, `enc="${enc}" dec="${dec}"`);
}

// Vigenere
for (const key of ['secret', 'a', 'ZzZz']) {
  const enc = vigenere(plain, key);
  const dec = vigenereDecrypt(enc, key);
  check(`Vigenere key="${key}" round-trip`, dec === plain, `enc="${enc}" dec="${dec}"`);
}
// Vigenere with wrong key should NOT match plaintext (sanity that it's actually doing something)
{
  const enc = vigenere(plain, 'secret');
  const dec = vigenereDecrypt(enc, 'wrongkey');
  check('Vigenere wrong-key does not silently succeed', dec !== plain, `dec="${dec}"`);
}

// AES-256-GCM (async)
(async () => {
  for (const pwd of ['correct-horse-battery-staple', 'p']) {
    const ct = await aesEncrypt(plain, pwd);
    const dec = await aesDecrypt(ct, pwd);
    check(`AES pwd="${pwd}" round-trip`, dec === plain, `dec="${dec}"`);
  }
  // wrong password must throw / fail, not silently return garbage as success
  try {
    const ct = await aesEncrypt(plain, 'right-password');
    await aesDecrypt(ct, 'wrong-password');
    check('AES wrong-password rejected', false, 'did not throw');
  } catch (e) {
    check('AES wrong-password rejected', true);
  }

  // two independent encrypt calls with same password should produce different
  // ciphertext (random salt/iv) but both decrypt correctly
  const ct1 = await aesEncrypt(plain, 'samepwd');
  const ct2 = await aesEncrypt(plain, 'samepwd');
  check('AES non-deterministic ciphertext (salt/iv randomized)', ct1 !== ct2);
  check('AES ct1 decrypts', await aesDecrypt(ct1, 'samepwd') === plain);
  check('AES ct2 decrypts', await aesDecrypt(ct2, 'samepwd') === plain);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
})();
