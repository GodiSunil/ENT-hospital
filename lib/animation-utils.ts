import { Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Creates a staggered animation for a list of items
 */
export function createStaggeredAnimation(
  baseDelay = 0.1,
  stagger = 0.1,
  animationVariants: Variants
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: baseDelay,
      },
    },
    ...animationVariants,
  };
}

/**
 * Creates a fade-in animation
 */
export function fadeIn(delay = 0, duration = 0.6): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        duration,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };
}

/**
 * Creates a slide-up animation
 */
export function slideUp(delay = 0, y = 20, duration = 0.6): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };
}

/**
 * Creates a slide-down animation
 */
export function slideDown(delay = 0, y = -20, duration = 0.6): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };
}

/**
 * Creates a slide-left animation
 */
export function slideLeft(delay = 0, x = 30, duration = 0.6): Variants {
  return {
    hidden: { opacity: 0, x },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay,
        duration,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };
}

/**
 * Creates a slide-right animation
 */
export function slideRight(delay = 0, x = -30, duration = 0.6): Variants {
  return {
    hidden: { opacity: 0, x },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay,
        duration,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };
}

/**
 * Creates a scale animation
 */
export function scale(
  delay = 0,
  initialScale = 0.9,
  duration = 0.6
): Variants {
  return {
    hidden: { opacity: 0, scale: initialScale },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay,
        duration,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };
}

/**
 * Creates a fade-in-up animation with a slight delay between items
 */
export function staggeredFadeInUp(
  count: number,
  baseDelay = 0.1,
  stagger = 0.1,
  y = 20,
  duration = 0.6
): { container: Variants; item: Variants } {
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: stagger,
          delayChildren: baseDelay,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * stagger + baseDelay,
          duration,
          ease: [0.4, 0, 0.2, 1],
        },
      }),
    },
  };
}

/**
 * Creates a typing effect animation
 */
export function typingEffect(
  text: string,
  baseDelay = 0,
  stagger = 0.05
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: baseDelay + i * stagger,
        duration: 0.3,
      },
    }),
  };
}

/**
 * Creates a bounce animation
 */
export function bounce(delay = 0, duration = 0.6): Variants {
  return {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: {
        delay,
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    },
  };
}

/**
 * Creates a pulse animation
 */
export function pulse(delay = 0, duration = 1.5): Variants {
  return {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        delay,
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    },
  };
}

/**
 * Creates a shake animation
 */
export function shake(delay = 0, duration = 0.8): Variants {
  return {
    hidden: { x: 0 },
    visible: {
      x: [0, -5, 5, -5, 5, -5, 0],
      transition: {
        delay,
        duration,
        ease: 'easeInOut',
      },
    },
  };
}

/**
 * Helper function to combine multiple animation variants
 */
export function combineVariants(...variants: Variants[]): Variants {
  return variants.reduce((acc, variant) => ({
    ...acc,
    ...variant,
    visible: {
      ...acc.visible,
      ...variant.visible,
      transition: {
        ...(acc.visible as any)?.transition,
        ...(variant.visible as any)?.transition,
      },
    },
  }));
}

/**
 * Creates a viewport configuration for scroll animations
 */
export function viewportConfig(
  amount: number | 'some' | 'all' = 0.1,
  margin = '0px 0px -100px 0px',
  once = true
) {
  return { amount, margin, once };
}
