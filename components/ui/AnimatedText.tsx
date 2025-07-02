'use client';

import { ReactNode, useRef, useEffect, ElementType, forwardRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
type SplitByType = 'word' | 'character' | 'line';

type AnimatedTextProps<T extends ElementType = 'div'> = {
  /** The HTML element or React component to render as the root element */
  as?: T;
  /** The text to animate */
  text: string | string[];
  /** Additional class name for the root element */
  className?: string;
  /** Class name for the text container */
  textClassName?: string;
  /** Delay before the animation starts (in seconds) */
  delay?: number;
  /** Duration of the animation (in seconds) */
  duration?: number;
  /** Delay between each element's animation (in seconds) */
  stagger?: number;
  /** How to split the text for animation */
  splitBy?: SplitByType;
  /** Type of animation to use */
  animationType?: AnimationType;
  /** Whether to animate only once */
  once?: boolean;
  /** Amount of element that needs to be visible to trigger the animation */
  amount?: number | 'some' | 'all';
} & Omit<React.ComponentProps<T>, 'as' | 'children'>;

const AnimatedText = <T extends ElementType = 'div'>(
  {
    text,
    className,
    textClassName,
    delay = 0,
    duration = 0.6,
    stagger = 0.02,
    splitBy = 'word',
    animationType = 'fadeIn',
    once = true,
    amount = 0.1,
    as: Component = 'div' as any,
    ...props
  }: AnimatedTextProps<T>,
  ref: React.ForwardedRef<HTMLElement>
) => {
  const controls = useAnimation();
  const localRef = useRef<HTMLElement>(null);
  const resolvedRef = (ref || localRef) as React.RefObject<HTMLElement>;
  const isInView = useInView(resolvedRef, { amount, once });

  type AnimationState = {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      delay: number;
      duration: number;
      ease: number[];
    };
  };

  type AnimationVariant = {
    hidden: AnimationState;
    visible: (i: number) => AnimationState;
  };

  const createAnimation = (hidden: AnimationState, visible: Omit<AnimationState, 'transition'>): AnimationVariant => ({
    hidden,
    visible: (i: number) => ({
      ...visible,
      transition: {
        delay: i * stagger,
        duration,
        ease: [0.34, 1.56, 0.64, 1],
      },
    }),
  });

  const animations: Record<string, AnimationVariant> = {
    fadeIn: createAnimation({ opacity: 0 }, { opacity: 1 }),
    slideUp: createAnimation({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }),
    slideDown: createAnimation({ opacity: 0, y: -20 }, { opacity: 1, y: 0 }),
    slideLeft: createAnimation({ opacity: 0, x: 20 }, { opacity: 1, x: 0 }),
    slideRight: createAnimation({ opacity: 0, x: -20 }, { opacity: 1, x: 0 }),
    scale: createAnimation({ opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 }),
  };

  const variants = animations[animationType] || animations.fadeIn;

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const renderText = (): ReactNode[] | ReactNode => {
    if (Array.isArray(text)) {
      return text.map((line, lineIndex) => (
        <div key={lineIndex} className="block">
          {renderLine(line, lineIndex)}
        </div>
      ));
    }
    return renderLine(text, 0);
  };

  const renderLine = (line: string, lineIndex: number): ReactNode[] | ReactNode => {
    if (splitBy === 'word') {
      return line.split(' ').map((word, wordIndex) => (
        <motion.span
          key={`${lineIndex}-${wordIndex}`}
          className="inline-block"
          initial="hidden"
          animate={controls}
          custom={lineIndex * 10 + wordIndex}
          variants={variants}
        >
          {word}{' '}
        </motion.span>
      ));
    } 
    
    if (splitBy === 'character') {
      return line.split('').map((char, charIndex) => (
        <motion.span
          key={`${lineIndex}-${charIndex}`}
          className="inline-block"
          initial="hidden"
          animate={controls}
          custom={lineIndex * 100 + charIndex}
          variants={variants}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ));
    }
    
    return (
      <motion.span
        key={lineIndex}
        className="inline-block"
        initial="hidden"
        animate={controls}
        custom={lineIndex}
        variants={variants}
      >
        {line}
      </motion.span>
    );
  };

  // Create a wrapper component to handle the ref properly
  const Wrapper = Component as React.ElementType;
  
  return (
    <Wrapper
      ref={resolvedRef}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <div className={textClassName}>
        {renderText()}
      </div>
    </Wrapper>
  );
};

// Forward the ref with proper typing
export default forwardRef(AnimatedText) as <T extends ElementType = 'div'>(
  props: AnimatedTextProps<T> & { ref?: React.ForwardedRef<HTMLElement> }
) => JSX.Element;
