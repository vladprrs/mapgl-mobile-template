# Bottom Sheet Refactoring Checklist

## Current State Assessment
Date: 2025-08-11

### Files to DELETE:
- [x] `src/components/bottom-sheet/BottomSheet.old.tsx` - Old implementation backup
- [x] `src/components/bottom-sheet/BottomSheet.tsx` - Current mixed implementation  
- [x] `src/hooks/useBottomSheet.old.ts` - Old hook backup
- [x] `src/hooks/useBottomSheet.ts` - Current hook (to be replaced with stub)

### Files to RENAME:
- [x] `src/components/bottom-sheet/BottomSheet.new.tsx` → `BottomSheet.tsx`

### Files to MODIFY:
- [x] `src/components/bottom-sheet/index.ts` - Remove feature flag logic
- [x] `src/hooks/useBottomSheet.ts` - Create minimal stub
- [x] `.env.local` - Remove NEXT_PUBLIC_USE_NEW_BOTTOM_SHEET
- [x] `.env.example` - Remove NEXT_PUBLIC_USE_NEW_BOTTOM_SHEET

### Test Files to UPDATE:
- [x] `src/__tests__/components/bottom-sheet/BottomSheet.test.tsx`
- [x] `src/__tests__/hooks/useBottomSheet.test.ts`
- [x] `src/__mocks__/react-modal-sheet.tsx` - Ensure proper mock

### Documentation to CLEAN:
- [ ] `README.md` - Remove feature flag mentions
- [ ] Remove migration guides:
  - `docs/react-modal-sheet-integration-guide.md`
  - `docs/bottom-sheet-code-inventory.md`
  - `docs/integration-recommendations.md`

## Dependencies Check:
- `react-modal-sheet`: Currently installed and working
- No other bottom sheet libraries needed

## Usage Locations:
- `src/app/page.tsx` - Uses BottomSheet component
- Various test files reference BottomSheet

## Verification Steps:
- [ ] No *.old.* files remain
- [ ] No NEXT_PUBLIC_USE_NEW_BOTTOM_SHEET references
- [ ] npm run dev works
- [ ] npm test passes
- [ ] npm run type-check passes
- [ ] Bottom sheet functionality verified