# Test Removal Plan

## Current Test Infrastructure Found

### Test Files/Folders to Remove
- [x] __tests__ folder (contains unit, integration, e2e tests)
- [x] coverage folder (Jest coverage reports)
- [x] All *.test.ts, *.test.tsx files in src/__tests__/
- [x] jest.config.js
- [x] jest.setup.js
- [x] playwright.config.ts
- [x] tsconfig.test.json

### Package.json Scripts to Remove
- [x] "test": "jest"
- [x] "test:watch": "jest --watch"
- [x] "test:coverage": "jest --coverage"
- [x] "test:unit": "jest __tests__/unit"
- [x] "test:integration": "jest __tests__/integration"
- [x] "test:e2e": "echo 'E2E tests are temporarily disabled..."
- [x] "test:e2e:mobile": "echo 'E2E tests are temporarily disabled..."
- [x] "test:e2e:ui": "echo 'E2E tests are temporarily disabled..."
- [x] "test:map": "jest --testPathPattern=Map"
- [x] "test:sheet": "jest --testPathPattern=BottomSheet"
- [x] "test:all": "npm run test:coverage && npm run test:e2e"

### Package.json Scripts to KEEP
- [x] "lint": "next lint" ✅ ESLint
- [x] "type-check": "tsc --noEmit" ✅ TypeScript
- [x] "build": "next build" ✅ Build
- [x] "dev": "bash -c 'rm -rf .next && next dev'" ✅ Development
- [x] "start": "next start" ✅ Production
- [x] "format": "prettier --write ..." ✅ Formatting
- [x] "analyze": "ANALYZE=true next build" ✅ Bundle analysis
- [x] "pre-deploy": "npm run type-check && npm run lint && npm run build" ✅ Quality checks
- [x] "prepare": "husky" ✅ Git hooks

### Dependencies to Remove from package.json
- [x] @testing-library/react
- [x] @testing-library/jest-dom
- [x] @testing-library/user-event
- [x] @types/jest
- [x] jest
- [x] jest-environment-jsdom
- [x] jest-watch-typeahead
- [x] @playwright/test
- [x] msw (Mock Service Worker for tests)
- [x] identity-obj-proxy (CSS module mocking)

### Dependencies to KEEP
- [x] typescript ✅ Type checking
- [x] eslint ✅ Linting
- [x] eslint-config-next ✅ Next.js ESLint rules
- [x] @eslint/eslintrc ✅ ESLint configuration
- [x] @types/* (except @types/jest) ✅ Type definitions
- [x] husky ✅ Git hooks
- [x] lint-staged ✅ Pre-commit hooks
- [x] prettier (implicit via lint-staged) ✅ Code formatting
- [x] All production dependencies ✅

### lint-staged Configuration to Update
Current configuration runs Jest on changed files:
```json
"lint-staged": {
  "*.{ts,tsx}": [
    "eslint --fix",
    "jest --bail --findRelatedTests --passWithNoTests"  // ❌ REMOVE THIS
  ],
  "*.{js,jsx,json,md}": [
    "prettier --write"  // ✅ KEEP THIS
  ]
}
```

Update to:
```json
"lint-staged": {
  "*.{ts,tsx}": [
    "eslint --fix"
  ],
  "*.{js,jsx,json,md}": [
    "prettier --write"
  ]
}
```

### TypeScript Configuration to Update
- Remove "jest" and "@testing-library/jest-dom" from types in tsconfig.json
- Keep all other TypeScript configuration intact

## Verification Checklist

After removal, these should FAIL:
- [ ] `npm test` - Should error: no test script
- [ ] `npm run test:watch` - Should error: no script
- [ ] `npm run test:coverage` - Should error: no script

After removal, these should SUCCEED:
- [ ] `npm run lint` - ✅ Should run ESLint
- [ ] `npm run type-check` - ✅ Should check types
- [ ] `npm run build` - ✅ Should build project
- [ ] `npm run dev` - ✅ Should start dev server
- [ ] `npm run format` - ✅ Should format code
- [ ] `git commit` - ✅ Should run lint-staged hooks

## Files Count Summary
- Test files found: 21 test files in src/__tests__/ + 9 test files in __tests__/
- Total test files to remove: ~30 files
- Configuration files to remove: 4 files (jest.config.js, jest.setup.js, playwright.config.ts, tsconfig.test.json)
- Directories to remove: 2 (__tests__, coverage)