/**
 * Smoothly scrolls to the specified element or position
 * @param target - Element selector, HTMLElement, or top position
 * @param options - Scroll options
 */
export function scrollTo(
  target: string | HTMLElement | number,
  options: ScrollToOptions & { offset?: number } = {}
): void {
  const {
    behavior = 'smooth',
    offset = 0,
    ...scrollOptions
  } = options;

  let top: number;

  if (typeof target === 'string') {
    const element = document.querySelector(target);
    if (!element) return;
    top = element.getBoundingClientRect().top + window.scrollY;
  } else if (typeof target === 'number') {
    top = target;
  } else {
    top = target.getBoundingClientRect().top + window.scrollY;
  }

  window.scrollTo({
    top: top + offset,
    behavior,
    ...scrollOptions,
  });
}

/**
 * Scrolls to the top of the page
 */
export function scrollToTop(options: ScrollToOptions = {}) {
  scrollTo(0, { behavior: 'smooth', ...options });
}

/**
 * Checks if an element is in the viewport
 */
export function isInViewport(element: HTMLElement, offset = 0): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= 0 + offset
  );
}

/**
 * Disables scroll on the body
 */
export function disableBodyScroll(): void {
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  document.body.classList.add('no-scroll');
}

/**
 * Enables scroll on the body
 */
export function enableBodyScroll(): void {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  document.body.classList.remove('no-scroll');
}

/**
 * Locks the body scroll while keeping the ability to scroll a specific element
 */
export function lockBodyScroll(element: HTMLElement): () => void {
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;
  
  disableBodyScroll();
  
  // Prevent body from scrolling
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = `-${scrollX}px`;
  document.body.style.width = '100%';
  
  // Allow the specified element to scroll
  element.style.overflowY = 'auto';
  
  return () => {
    // Restore original styles
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    element.style.overflowY = '';
    
    // Restore scroll position
    window.scrollTo(scrollX, scrollY);
    enableBodyScroll();
  };
}
