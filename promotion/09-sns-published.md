# SNS 카드뉴스 — 발행 완료 아카이브

08-sns-cards.md에서 완전히 게시 끝난 세트를 옮겨놓는 곳. 진행 중/예정 항목은 08-sns-cards.md에 남겨두고, 3개 플랫폼(Instagram·Threads·X) 전부 게시 확인된 것만 여기로 이동.

디자인 시스템·타입 매핑·카피라이팅 원칙·폴더 규칙 같은 재사용 참고자료는 전부 08-sns-cards.md에 그대로 있음 — 새 카드 만들 때는 거기부터 볼 것.

---

## 완료: Global 세트 5종 (2026-08-08)

영어 계정(글로벌 유입)용 첫 배치. 전부 실제 계산기 공식으로 node 검산한 수치만 사용, 허위 통계 없음(출처 필요한 사실은 실제 표준/기관 인용 — NIST SP 800-63B Rev 4는 웹서치로 2025-07 확정 확인).

### A. Compound Interest — `global-compound-interest.html`
**이미지**: `promotion/cards/global/compound-interest-01/slide1~5.png`
**검증**: \$500/월·8%·월복리 가정, annuity-due 공식(compound-interest.html과 동일 공식)으로 25세/30세/35세/40세 시작 시 65세 시점 값 전부 node 재계산 — 25세 시작 \$1,757,141, 35세 시작 \$750,148, 10년 늦으면 \$1,006,993(백만불 이상) 손실. Rule of 72(72÷8=9년마다 2배)도 확인.

**Alt Text**:
1. Text card: Waiting 10 years to invest costs you over \$1,000,000. \$500 a month at 8% return, starting at 25 versus starting at 35.
2. Checklist: three signs you keep delaying investing — no account open yet, thinking \$500 a month is too small, waiting for the right time.
3. Text card: Compound interest pays interest on your interest. At 8% annual return your money roughly doubles every 9 years.
4. Table: \$500 a month at 8% return by starting age — age 25 reaches \$1.76 million by 65, age 30 reaches \$1.15 million, age 35 reaches \$750,000, age 40 reaches \$479,000.
5. Call to action: Run your own numbers in 10 seconds. Free, no signup. Button reads Calculate Your Growth.

**Instagram**
```
Waiting 10 years to start investing can cost you over $1,000,000.

At 8% average return, $500/month invested from 25 to 65 grows to $1.76M. Start at 35 instead, and it's just $750K — a $1M+ gap from a single decade of waiting.

Compound interest rewards time more than it rewards timing.

📌 Save this for the next time you think "I'll start next year."
👉 Visit the link in bio and search 'Compound Interest Calculator' to run your own numbers.

#modoohub #compoundinterest #investing #personalfinance #fire #ruleof72 #financetips
```

**Threads**
```
Waiting 10 years to start investing can cost you over $1,000,000.

$500/month at 8% return: start at 25 → $1.76M by 65. Start at 35 → $750K. Same monthly amount, one decade later, and you lose over a million.

Rule of 72: at 8%, your money doubles every ~9 years. Skip a decade, skip a doubling.

modoohub.com/compound-interest.html
```

**X**
```
Waiting 10 years to invest costs you $1M+.

$500/mo at 8%:
→ Start at 25: $1.76M by 65
→ Start at 35: $750K by 65

Same contribution. One decade later. $1M gap.

Run your own numbers:
modoohub.com/compound-interest.html
```

### B. Loan Payment Breakdown — `global-loan-calculator.html`
**이미지**: `promotion/cards/global/loan-calculator-en-01/slide1~5.png`
**검증**: \$250,000·6.5%·30년 월납입금 \$1,580.17(loan-calculator-en.html 자체 FAQ 예시와 정확히 일치), 총이자 \$318,861 node 재계산. \$300,000·30년 기준 4%/5%/6% 총이자(각 \$215,609/\$279,767/\$347,515)도 재계산 — 0.5%당 페이지 자체 FAQ 주장("\$32,000+ 절감")과 일치 확인.

**Alt Text**:
1. Text card: Your mortgage costs more. \$318,861 — that's the interest alone on a \$250,000 mortgage at 6.5% over 30 years.
2. Payment breakdown: \$250,000 mortgage at 6.5%, 30 years — monthly payment \$1,580, month 1 interest \$1,354, month 1 principal \$226, total interest over 30 years \$318,861.
3. Table: total interest by rate on a \$300,000 30-year loan — 4.0% is \$215,609, 5.0% is \$279,767, 6.0% is \$347,515.
4. Checklist: before you sign, check 3 things — compare APR not just the rate, ask about prepayment penalties, even \$100 a month extra helps.
5. Call to action: See your real payment in 10 seconds. Free, no signup. Button reads Calculate My Payment.

**Instagram**
```
A $250,000 mortgage doesn't cost $250,000. At 6.5% over 30 years, you'll pay $318,861 in interest alone — more than the loan itself.

Every 0.5% rate change shifts your lifetime interest by $30,000+. And paying just $100/month extra can cut 4-5 years off a 30-year loan.

📌 Save this before you sign anything.
👉 Visit the link in bio and search 'Loan Calculator' to see your real numbers.

#modoohub #mortgage #loancalculator #personalfinance #homebuying #financetips
```

**Threads**
```
A $250,000 mortgage at 6.5% for 30 years actually costs $568,861 — $318,861 of that is interest alone, more than the loan amount.

Every 0.5% rate change moves lifetime interest by $30K+. Even $100/month extra can cut 4-5 years off the loan.

modoohub.com/loan-calculator-en.html
```

**X**
```
$250,000 mortgage @ 6.5% / 30yr:

Monthly: $1,580
Interest alone: $318,861 (more than the loan)

Rate matters. 4% vs 6% = $130K+ difference in total interest.

Calculate yours:
modoohub.com/loan-calculator-en.html
```

### C. Password Strength (NIST 2025) — `global-password-generator.html`
**이미지**: `promotion/cards/global/password-generator-01/slide1~5.png`
**검증**: NIST SP 800-63B Rev 4(2025-07 확정) 웹서치로 확인 — 길이 우선, 특수문자·강제변경 요건 폐지, 64자 이상 지원 요구. 엔트로피 표(8자 소문자 38비트/8자 혼합 52비트/12자 혼합 78비트/16자 혼합 103비트)는 password-generator.html이 실제로 쓰는 88자 문자셋 기준으로 node 재계산 — 16자 103비트는 이 세션에 이미 검증된 수치 재사용.

**Alt Text**:
1. Warning card: your password rules are outdated. NIST rewrote the guidelines in 2025 — most advice you've heard is wrong.
2. Warning card: length beats complexity. NIST SP 800-63B 2025 requires systems to support passwords of at least 64 characters; special characters and forced changes are no longer required.
3. Checklist: 3 things NIST says to stop doing — forced periodic changes, mandatory special characters, reusing one password everywhere.
4. Table: password entropy by length and charset — 8 characters lowercase only is 38 bits, 8 mixed with symbols is 52 bits, 12 mixed is 78 bits, 16 mixed is 103 bits.
5. Call to action: Generate a strong password in 1 second. Free, no signup. Button reads Generate a Password.

**Instagram**
```
NIST just reversed decades of password advice. Their 2025 guidelines: length beats complexity. Special characters and forced password changes are no longer required — they just create predictable patterns.

The real math: an 8-character lowercase password has 38 bits of entropy. A 16-character mixed password has 103 bits. Every +1 bit doubles the guesses needed to crack it.

📌 Save this before your next password reset.
👉 Visit the link in bio and search 'Password Generator' to make a strong one in 1 second.

#modoohub #cybersecurity #passwordsecurity #nist #infosec #techtips
```

**Threads**
```
NIST rewrote the password rules in 2025: length beats complexity. Special characters and forced periodic changes are no longer required — turns out they just made passwords more predictable, not safer.

The math: 8 chars lowercase = 38 bits of entropy. 16 chars mixed = 103 bits. Every bit doubles the guessing work.

modoohub.com/password-generator.html
```

**X**
```
NIST 2025 update: length > complexity.

Entropy by password:
8 chars, lowercase: 38 bits
8 chars, mixed: 52 bits
16 chars, mixed: 103 bits

Generate a strong one in 1 sec:
modoohub.com/password-generator.html
```

### D. Lump Sum vs. DCA — `global-investment-comparison.html`
**이미지**: `promotion/cards/global/investment-return-calculator-01/slide1~5.png`
**검증**: investment-return-calculator.html과 동일한 annuity 공식으로 \$60,000·8%·10년 기준 lump sum \$133,178 vs DCA(\$500/월×10년, 원금 동일) \$92,083, 차액 \$41,096 node 재계산. 상수 수익률 가정이라는 전제를 슬라이드에 명시(실제 시장 변동성 언급 없이 과장 안 함).

**Alt Text**:
1. Comparison card: Lump Sum vs DCA. Same \$60,000, \$41,096 difference — same 8% return, same 10 years, timing changes everything.
2. Side-by-side: A. Lump Sum — all at once, more time in the market. B. DCA — \$500 a month, smooths volatility, less regret risk.
3. Text card: \$60,000 at 8% over 10 years — investing it all at once beats spreading it out. Lump sum result \$133,178, DCA result \$92,083.
4. Checklist: got a windfall, lump sum usually wins if markets trend up. Nervous about bad timing, DCA reduces regret risk even if average outcome is lower.
5. Call to action: Compare your own numbers in 10 seconds. Free, no signup. Button reads Run the Comparison.

**Instagram**
```
Same $60,000. Two ways to invest it. A $41,096 difference.

Assuming the same 8% average return over 10 years, investing $60,000 all at once grows to $133,178 — investing the same total gradually ($500/month) only reaches $92,083. More time in the market usually wins.

But if you're nervous about bad timing, dollar-cost averaging still reduces regret risk, even if the average outcome is lower.

📌 Save this before your next investment decision.
👉 Visit the link in bio and search 'Investment Return Calculator' to compare your own numbers.

#modoohub #investing #dollarcostaveraging #personalfinance #financetips #wealthbuilding
```

**Threads**
```
Same $60,000, two strategies, $41,096 difference.

Lump sum (invest it all today) at 8% over 10 years: $133,178.
DCA ($500/month for 10 years, same total) at 8%: $92,083.

Time in the market usually beats timing the market — but DCA still wins on reducing regret risk if you're worried about bad timing.

modoohub.com/investment-return-calculator.html
```

**X**
```
$60,000. Same 8% return. 10 years.

Lump sum: $133,178
DCA ($500/mo): $92,083

$41,096 gap — from timing alone.

Compare your numbers:
modoohub.com/investment-return-calculator.html
```

### E. BMI — `global-bmi.html`
**이미지**: `promotion/cards/global/bmi-calc-01/slide1~5.png`
**검증**: 170cm/65kg 예시 → 22.5(65/1.7²=22.49 반올림). bmi-calc.html 자체 FAQ가 WHO 글로벌 기준(18.5/25/30)과 계산기가 실제로 쓰는 Asia-Pacific 기준(18.5/23/25)을 이미 정직하게 구분해서 설명하고 있어, 카드에도 동일하게 "이 계산기는 Asia-Pacific 기준을 씀"이라고 명시(서양 사용자가 자기 기준과 다르게 나와도 당황하지 않게).

**Alt Text**:
1. Text card: What's your BMI? Enter height and weight for an instant result.
2. Sample result: BMI 22.5, normal weight. Example based on 5 foot 7 inches (170cm), 143 pounds (65kg).
3. Table: body fat and waist risk thresholds, Asia-Pacific standard — body fat 25%+ for men, 32%+ for women; waist 90cm/35in+ for men, 85cm/33in+ for women.
4. Guide: BMI ranges, Asia-Pacific standard — under 18.5 underweight, 18.5 to 23 normal, 23 to 25 overweight, 25+ obese. Global WHO standard differs: normal 18.5–25, obese 30+.
5. Call to action: Check your BMI in 3 seconds. Free, no signup. Button reads Calculate My BMI.

**Instagram**
```
What's your BMI? Enter height and weight for an instant result — takes 3 seconds.

Heads up: this calculator uses the Asia-Pacific standard (normal range 18.5–23), which is stricter than the global WHO range (18.5–25). If you're used to Western BMI charts, your result may look different than expected — and that's by design, not a bug.

👉 Visit the link in bio and search 'BMI Calculator' to check yours.

#modoohub #bmi #healthcheck #fitness #wellness #healthtips
```

**Threads**
```
Quick BMI check — 3 seconds, just height and weight.

Note: this uses the Asia-Pacific BMI standard (normal = 18.5–23), stricter than the global WHO range (18.5–25). Research shows Asian populations face higher metabolic risk at lower BMI, hence the tighter cutoff.

modoohub.com/bmi-calc.html
```

**X**
```
Quick BMI check in 3 seconds.

Uses the Asia-Pacific standard (18.5–23 normal) — stricter than global WHO (18.5–25).

modoohub.com/bmi-calc.html
```

**상태**: [x] 5종 전부 Instagram·Threads·X 게시 완료 (2026-08-09)
