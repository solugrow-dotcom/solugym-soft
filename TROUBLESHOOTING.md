# Troubleshooting Guide

## Tailwind CSS "Cannot find module" Error

### Issue
The build fails with `Error: Cannot find module '.../tailwindcss/lib/index.js'`.

### Cause
This usually happens when:
1.  Installation was interrupted (`npm install` didn't finish).
2.  Corrupted `node_modules`.
3.  Version mismatch between `postcss` and `tailwindcss`.

### Solution
Run the following commands in your terminal:

```bash
# 1. Clear node_modules to ensure a fresh start
rm -rf node_modules package-lock.json

# 2. Re-install all dependencies
npm install

# 3. Explicitly install Tailwind and peers
npm install -D tailwindcss postcss autoprefixer

# 4. Try running dev again
npm run dev
```
