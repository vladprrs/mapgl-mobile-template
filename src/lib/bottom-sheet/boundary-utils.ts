export const SCROLL_EPSILON_PX = 3;

export interface ScrollInfo {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
  maxScrollTop: number;
}

export function getScrollInfo(element: HTMLElement): ScrollInfo {
  const { scrollTop, scrollHeight, clientHeight } = element;
  const maxScrollTop = Math.max(0, scrollHeight - clientHeight);
  return { scrollTop, scrollHeight, clientHeight, maxScrollTop };
}

export function isAtTop(element: HTMLElement): boolean {
  const { scrollTop } = getScrollInfo(element);
  return scrollTop <= SCROLL_EPSILON_PX;
}

export function isAtBottom(element: HTMLElement): boolean {
  const { scrollTop, maxScrollTop } = getScrollInfo(element);
  return scrollTop >= maxScrollTop - SCROLL_EPSILON_PX;
}

export type ScrollDirection = 'up' | 'down';

export function canScroll(element: HTMLElement, direction: ScrollDirection): boolean {
  const { scrollTop, maxScrollTop } = getScrollInfo(element);
  if (direction === 'up') {
    // Can scroll up if not at bottom
    return scrollTop < maxScrollTop - SCROLL_EPSILON_PX;
  }
  // direction === 'down': Can scroll down if not at top
  return scrollTop > SCROLL_EPSILON_PX;
}


