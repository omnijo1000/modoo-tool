#!/bin/bash
# Rebuild self-hosted webfonts in /fonts/ + regenerate nothing else.
# Run when bumping Noto Sans KR / DM Mono versions.
#
# Deps:  python3 -m venv .fontenv && .fontenv/bin/pip install 'fonttools[woff]' brotli
# Usage: bash build-fonts.sh
#
# Source: Noto Sans KR variable TTF from google/fonts (OFL 1.1),
#         DM Mono woff2 from fonts.gstatic.com (OFL 1.1).
# Subset: Latin + Latin-1/ext-A/B + punctuation + symbols/arrows/dingbats
#         + Hangul Jamo/Compat-Jamo + full Hangul syllables (AC00-D7A3).
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
PY="${PY:-$DIR/.fontenv/bin/python}"
OUT="$DIR/fonts"
SRC="$(mktemp -d)"
mkdir -p "$OUT"
cd "$SRC"

UR="U+0020-00FF,U+0100-017F,U+0180-024F,U+2000-206F,U+2070-209F,U+20A0-20BF,U+2100-214F,U+2190-21FF,U+2200-22FF,U+2300-23FF,U+25A0-25FF,U+2600-27BF,U+3000-303F,U+3130-318F,U+1100-11FF,U+A960-A97F,U+AC00-D7A3,U+D7B0-D7FF,U+FF00-FFEF"
URLAT="U+0020-00FF,U+0100-017F,U+2000-206F,U+2190-21FF,U+2212,U+00D7"

curl -sSL --max-time 120 -o nsk-vf.ttf \
  "https://github.com/google/fonts/raw/main/ofl/notosanskr/NotoSansKR%5Bwght%5D.ttf"

for w in 400 500 600 700 800 900; do
  "$PY" -m fontTools.varLib.instancer nsk-vf.ttf wght=$w -o inst-$w.ttf --quiet
  "$PY" -m fontTools.subset inst-$w.ttf --unicodes="$UR" \
    --flavor=woff2 --with-zopfli --desubroutinize --notdef-outline \
    --name-IDs=1,2,3,4,6 --recalc-bounds \
    --output-file="$OUT/notosanskr-$w.woff2"
  echo "notosanskr-$w.woff2  $(du -h "$OUT/notosanskr-$w.woff2" | cut -f1)"
done

dm_url() { case "$1" in
  400) echo "https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYthqQBA.woff2";;
  500) echo "https://fonts.gstatic.com/s/dmmono/v16/aFTR7PB1QTsUX8KYvumzEYOtbQ.woff2";;
esac; }
for w in 400 500; do
  curl -sS --max-time 60 -o dm-$w.woff2 "$(dm_url $w)"
  "$PY" -m fontTools.subset dm-$w.woff2 --unicodes="$URLAT" \
    --flavor=woff2 --with-zopfli --output-file="$OUT/dmmono-$w.woff2"
  echo "dmmono-$w.woff2  $(du -h "$OUT/dmmono-$w.woff2" | cut -f1)"
done

rm -rf "$SRC"
du -sh "$OUT"
