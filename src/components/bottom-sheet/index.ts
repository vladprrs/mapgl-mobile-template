// Feature flag switching logic for bottom sheet implementation
const USE_NEW_SHEET = process.env.NEXT_PUBLIC_USE_NEW_BOTTOM_SHEET === 'true';

// Export the appropriate implementation based on feature flag
export { type BottomSheetProps } from './BottomSheet';

// Import both implementations
import { BottomSheet as BottomSheetOld } from './BottomSheet';
import { BottomSheet as BottomSheetNew } from './BottomSheet.new';

// Dynamic export based on feature flag
export const BottomSheet = USE_NEW_SHEET ? BottomSheetNew : BottomSheetOld;