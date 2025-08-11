# Bottom Sheet Migration Validation Checklist

## Implementation Status

### Phase 1: Setup ✅
- [x] Feature flag added to .env.local
- [x] Feature flag added to .env.example  
- [x] react-modal-sheet installed
- [x] motion installed
- [x] Backup files created (BottomSheet.old.tsx, useBottomSheet.old.ts)

### Phase 2: Core Implementation ✅
- [x] New BottomSheet.new.tsx component created
- [x] bottom-sheet.css style overrides created
- [x] Custom wheel handler implemented
- [x] Feature flag switching logic in index.ts
- [x] useBottomSheet hook deprecation warning added

### Phase 3: Testing Infrastructure ✅
- [x] Mock for react-modal-sheet created
- [x] Tests run with old implementation (242 passed, 8 failed - existing failures)
- [ ] Tests run with new implementation (pending verification)

## Feature Validation Checklist

### Core Functionality
- [ ] All snap points work (10%, 50%, 90%)
- [ ] Initial snap point defaults to 50% (middle)
- [ ] Snap animations are smooth (60fps)
- [ ] onSnapChange callback fires correctly with snap value

### Drag Handle
- [ ] Drag handle cursor changes (grab → grabbing)
- [ ] Drag handle is visible and styled correctly
- [ ] Dragging works smoothly on desktop
- [ ] Touch dragging works smoothly on mobile

### Content Scrolling
- [ ] Content scrolls only when expanded (90%)
- [ ] Content scroll doesn't interfere with sheet dragging
- [ ] Scroll boundary detection works (pull down at top to collapse)
- [ ] Overflow is hidden when not expanded

### Desktop Support
- [ ] Wheel events work on desktop
- [ ] Wheel direction matches expected behavior:
  - [ ] Scroll DOWN (positive deltaY) = COLLAPSE
  - [ ] Scroll UP (negative deltaY) = EXPAND
- [ ] Wheel threshold prevents accidental snapping

### Mobile Support
- [ ] Touch gestures feel natural on mobile
- [ ] Safe area padding applies on iOS (env(safe-area-inset-bottom))
- [ ] No gesture conflicts with map interactions
- [ ] Smooth animations during drag

### Visual Design
- [ ] Background is white
- [ ] Border radius on top corners (rounded-t-2xl)
- [ ] Shadow applies correctly (shadow-2xl)
- [ ] Z-index layering is correct (z-50)
- [ ] Data attributes update correctly (data-sheet-state)

### State Management
- [ ] State labels are correct ('collapsed', 'half', 'expanded')
- [ ] isExpanded detection works correctly
- [ ] Header slot renders correctly
- [ ] Children content renders correctly

### Performance
- [ ] No console errors or warnings (except deprecation warning)
- [ ] No TypeScript errors
- [ ] Bundle size impact is acceptable
- [ ] No memory leaks
- [ ] Animations maintain 60fps

### Backward Compatibility
- [ ] Old implementation still works with feature flag = false
- [ ] API is identical for both implementations
- [ ] All existing tests pass (or have same failures)
- [ ] No breaking changes for consumers

## Testing Scenarios

### Manual Testing Steps

1. **Basic Navigation**
   - [ ] Start app with NEXT_PUBLIC_USE_NEW_BOTTOM_SHEET=false
   - [ ] Verify old implementation works
   - [ ] Restart with NEXT_PUBLIC_USE_NEW_BOTTOM_SHEET=true
   - [ ] Verify new implementation works

2. **Snap Point Testing**
   - [ ] Drag to collapse (10%)
   - [ ] Drag to half (50%)
   - [ ] Drag to expand (90%)
   - [ ] Verify smooth transitions between states

3. **Content Interaction**
   - [ ] Add scrollable content
   - [ ] Verify scrolling only works when expanded
   - [ ] Test pull-to-collapse from top of scrolled content
   - [ ] Verify content doesn't scroll when half or collapsed

4. **Desktop Interaction**
   - [ ] Test mouse drag on handle
   - [ ] Test wheel scrolling to change states
   - [ ] Verify cursor changes on hover/drag

5. **Mobile Interaction**
   - [ ] Test on actual device or simulator
   - [ ] Verify touch gestures
   - [ ] Check safe area padding on iPhone
   - [ ] Test landscape orientation

## Known Issues

### From Testing
- Existing test failures (8) are unrelated to migration
- These failures existed before migration and persist

### To Monitor
- Wheel event implementation is custom (not native to library)
- Performance on low-end devices
- Edge cases with rapid gestures

## Rollback Plan

If issues are found:
1. Set NEXT_PUBLIC_USE_NEW_BOTTOM_SHEET=false in environment
2. Redeploy application
3. Old implementation will be used immediately
4. No code changes required for rollback

## Sign-off

- [ ] Development team approval
- [ ] QA team approval
- [ ] Product owner approval
- [ ] Ready for production deployment

## Notes

The migration maintains full backward compatibility through the feature flag system. Both implementations coexist, allowing for safe testing and gradual rollout. The new implementation using react-modal-sheet provides a more maintainable codebase while preserving the exact same user experience.