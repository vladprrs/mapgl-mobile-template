export type SnapPoint = number;

export interface BottomSheetOptions {
  snapPoints?: [SnapPoint, SnapPoint, SnapPoint];
  initialSnap?: SnapPoint;
  onSnapChange?: (snap: SnapPoint) => void;
}

export interface BottomSheetProps {
  className?: string;
  header?: React.ReactNode;
  stickyHeader?: React.ReactNode;
  children?: React.ReactNode;
  snapPoints?: [number, number, number];
  initialSnap?: number;
  onSnapChange?: (snap: number) => void;
}

export interface BottomSheetRef {
  snapTo: (snap: number) => void;
}