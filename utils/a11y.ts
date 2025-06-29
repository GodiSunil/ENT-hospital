/**
 * Traps focus within a container element for accessibility
 */
export function trapFocus(
  element: HTMLElement,
  prevFocusableElement?: HTMLElement
): () => void {
  const focusableElements = Array.from(
    element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter(el => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1');

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);
  firstFocusable?.focus();

  return () => {
    element.removeEventListener('keydown', handleKeyDown);
    prevFocusableElement?.focus();
  };
}

/**
 * Manages focus for modal dialogs
 */
export function focusTrap(
  element: HTMLElement,
  options: { preventScroll?: boolean } = {}
): () => void {
  const previouslyFocusedElement = document.activeElement as HTMLElement;
  
  // Focus the modal
  element.focus({ preventScroll: options.preventScroll });
  
  // Trap focus within the modal
  const cleanupFocusTrap = trapFocus(element, previouslyFocusedElement);
  
  // Handle Escape key
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      previouslyFocusedElement?.focus();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    cleanupFocusTrap();
    document.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Makes an element focusable and manages its tabindex
 */
export function makeFocusable(
  element: HTMLElement,
  isFocusable: boolean
): void {
  if (isFocusable) {
    element.setAttribute('tabindex', '0');
  } else {
    element.setAttribute('tabindex', '-1');
  }
}

/**
 * Checks if an element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  if (element.getAttribute('tabindex') === '-1') return false;
  
  const tagName = element.tagName.toLowerCase();
  const validTags = ['a', 'button', 'input', 'select', 'textarea', 'details'];
  
  if (validTags.includes(tagName)) {
    if (tagName === 'a' && !(element as HTMLAnchorElement).href) return false;
    if (element.hasAttribute('disabled')) return false;
    return true;
  }
  
  return element.hasAttribute('tabindex');
}

/**
 * Focuses the first focusable element within a container
 */
export function focusFirstFocusable(container: HTMLElement): void {
  const focusable = container.querySelector<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusable) {
    focusable.focus();
  } else {
    container.focus();
  }
}
