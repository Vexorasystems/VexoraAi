#!/usr/bin/env bash
# Vexora · Pre-deploy verification
# Run this BEFORE `git push` to catch any local corruption.
# Exits non-zero if anything would break Vercel.

set -e
cd "$(dirname "$0")"

echo "▸ Vexora · pre-deploy verification"
echo ""

# 1. JSON validity
echo "  [1/6] Validating JSON files..."
for f in package.json tsconfig.json vercel.json; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))" \
    && echo "        ✓ $f" \
    || (echo "        ✗ $f INVALID" && exit 1)
done

# 2. No 'use client' contamination
echo "  [2/6] Scanning for 'use client' contamination..."
BAD=$(grep -rln "use client" \
  --include="*.json" --include="*.js" --include="*.css" --include="*.md" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
  . 2>/dev/null || true)
if [ -n "$BAD" ]; then
  echo "        ✗ 'use client' found in non-component files:"
  echo "$BAD" | sed 's/^/          /'
  exit 1
fi
echo "        ✓ Clean"

# 3. Critical imports
echo "  [3/6] Verifying critical imports..."
grep -q "from '@/lib/utils'" components/ui/SystemCard.tsx \
  && echo "        ✓ SystemCard imports sparkPath from @/lib/utils" \
  || (echo "        ✗ SystemCard sparkPath import wrong" && exit 1)
grep -q "^export function sparkPath" lib/utils.ts \
  && echo "        ✓ sparkPath exported from lib/utils" \
  || (echo "        ✗ sparkPath not exported from lib/utils" && exit 1)

# 4. TypeScript
echo "  [4/6] TypeScript strict check (this takes ~10s)..."
if [ ! -d node_modules ]; then
  echo "        Installing dependencies first..."
  npm install --silent --no-audit --no-fund
fi
TSC_OUT=$(npx tsc --noEmit 2>&1)
if [ -n "$TSC_OUT" ]; then
  echo "        ✗ Type errors:"; echo "$TSC_OUT"; exit 1
fi
echo "        ✓ Zero type errors"

# 5. Production build
echo "  [5/6] Running production build (this takes ~30s)..."
BUILD_OUT=$(npx next build 2>&1)
if echo "$BUILD_OUT" | grep -qE "(Failed to compile|Type error|Module not found)"; then
  echo "        ✗ Build failed:"
  echo "$BUILD_OUT" | grep -E "(error|Error)" | head -10
  exit 1
fi
PAGES=$(echo "$BUILD_OUT" | grep -oE "Generating static pages \([0-9]+/[0-9]+\)" | tail -1)
echo "        ✓ Build passed · $PAGES"

# 6. No build artifacts in commit
echo "  [6/6] Checking for accidental build artifacts..."
[ -d .next ] && rm -rf .next
[ -d node_modules ] && echo "        ⚠ node_modules will be ignored by .gitignore"
echo "        ✓ Ready"

echo ""
echo "▸ All checks passed. Safe to git push."
