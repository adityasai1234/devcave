# Mistakes & Lessons Learned

## Project Build Mistakes

### 1. Forgot to Remove Old Chakra UI Components

**Problem:** Build failed because old Chakra UI components still existed in `src/app/about`, `src/app/contact`, `src/app/projects`, `src/app/skills` directories and `src/components/ui/` folder.

**Fix:** Removed all old Chakra UI components and pages:
```bash
rm -rf src/app/about src/app/contact src/app/projects src/app/skills src/components/ui/ProjectCard.tsx src/components/ui/Hero.tsx src/components/ui/Header.tsx src/components/ui/Footer.tsx src/components/ui/ContactForm.tsx src/components/ui/Layout.tsx src/components/ui/Button.tsx src/components/ui/SkillGlobe.tsx
```

### 2. Left Old providers.tsx Reference

**Problem:** `src/app/layout.tsx` still imported from `src/app/providers.tsx` which was removed.

**Fix:** Updated `src/app/layout.tsx` to remove the Providers wrapper and use simplified layout.

### 3. Left Old template.tsx

**Problem:** `src/app/template.tsx` had imports to deleted files.

**Fix:** Removed `src/app/template.tsx`.

### 4. ESLint Warnings in Window.tsx

**Problem:** `useEffect` had missing dependency warnings for `onFocus` and `sequence`.

**Fix:** Added `// eslint-disable-next-line react-hooks/exhaustive-deps` comments to suppress warnings since the dependencies are intentionally excluded for performance reasons.

### 5. TypeScript Type Errors in TerminalWindow.tsx

**Problem:** Type errors with `setLines` state updates due to literal type widening.

**Fix:** Added explicit type casting with `as const` and explicit `TerminalLine[]` return type annotation:
```typescript
setLines((prev): TerminalLine[] => [
  ...prev,
  { type: 'input' as const, content: `$ ${input}` },
  ...
])
```

## Testing Notes

- Jest tests were written but require proper SWC binary installation to run
- The test environment needs `@next/swc-darwin-arm64` for macOS ARM
- Tests cover: useWindowManager, useDraggable, Window component, TerminalWindow, ProjectsWindow, Topbar
- Switched from babel-jest to @swc/jest for better macOS compatibility
- Added @swc/core and @swc/jest dependencies

### 6. Jest Config for macOS

**Problem:** Jest failed to run on macOS due to SWC binary issues.

**Fix:** Installed `@swc/core` and `@swc/jest`, configured Jest to use SWC transform:
```javascript
transform: {
  '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest', {...}],
}
```

### 7. Topbar styled-jsx Warning

**Problem:** `<style jsx>` caused React warnings in tests.

**Fix:** Changed to `<style jsx global>` to properly inject global styles.

## Potential Improvements

1. **Window Persistence** — Save window positions to localStorage
2. **More Terminal Commands** — Add more interactive commands
3. **Window Snap** — Add snap-to-edge functionality (like Hyprland)
4. **Keyboard Navigation** — Add keyboard shortcuts for window management
5. **Accessibility** — Improve ARIA labels and keyboard navigation
