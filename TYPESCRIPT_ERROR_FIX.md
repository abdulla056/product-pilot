# 🔧 Quick Fix for TypeScript Error

## The Error
```
Cannot find module '@/components/connect-youtube-button' or its corresponding type declarations.
```

## ✅ Solution

The file exists and is correct. This is a TypeScript server cache issue. Here's how to fix it:

### Option 1: Restart Dev Server (Recommended)

```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
npm run dev
```

### Option 2: Reload VS Code Window

1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Reload Window"
3. Press Enter

### Option 3: Restart TypeScript Server

1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "TypeScript: Restart TS Server"
3. Press Enter

### Option 4: Clean Build

```bash
# Remove build artifacts and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

## Why This Happened

1. The file was created after TypeScript server started
2. The `src/` directory restructure may have confused the cache
3. TypeScript didn't detect the new file automatically

## ✅ Verify It's Fixed

After restarting, check:

1. No red squiggly lines under the import
2. Can hover over `ConnectYouTubeButton` and see type info
3. No errors in VS Code's "Problems" panel

---

**The file is definitely there** at:
```
src/components/connect-youtube-button.tsx
```

Just needs a TypeScript server refresh! 🔄
