'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string | string[];
  className?: string;
  textClassName?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitBy?: 'word' | 'character' | 'line';
  animationType?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  once?: boolean;
  amount?: number | 'some' | 'all';
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any;
}

export function AnimatedText({
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
  as: Component = 'div',
  ...props
}: AnimatedTextProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount,
    once,
  });

  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: (i: number) => ({
        opacity: 1,
        transition: {
          delay: i * stagger,
          duration,
          ease: [0.4, 0, 0.2, 1],
        },
      }),
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * stagger,
          duration,
          ease: [0.4, 0, 0.2, 1],
        },
      }),
    },
    slideDown: {
      hidden: { opacity: 0, y: -20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * stagger,
          duration,
          ease: [0.4, 0, 0.2, 1],
        },
      }),
    },
    slideLeft: {
      hidden: { opacity: 0, x: 30 },
      visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: i * stagger,
          duration,
          ease: [0.4, 0, 0.2, 1],
        },
      }),
    },
    slideRight: {
      hidden: { opacity: 0, x: -30 },
      visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: i * stagger,
          duration,
          ease: [0.4, 0, 0.2, 1],
        },
      }),
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
          delay: i * stagger,
          duration,
          ease: [0.34, 1.56, 0.64, 1],
        },
      }),
    },
  };

  const variants = animations[animationType] || animations.fadeIn;

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const renderText = () => {
    if (Array.isArray(text)) {
      return text.map((line, lineIndex) => (
        <div key={lineIndex} className="block">
          {renderLine(line, lineIndex)}
        </div>
      ));
    }
    return renderLine(text, 0);
  };

  const renderLine = (line: string, lineIndex: number) => {
    if (splitBy === 'word') {
      return line.split(' ').map((word, wordIndex) => {
        const index = lineIndex * 10 + wordIndex;
        return (
          <motion.span
            key={`${lineIndex}-${wordIndex}`}
            className="inline-block"
            initial="hidden"
            animate={controls}
            custom={index}
            variants={variants}
          >
            {word}{' '}
          </motion.span>
        );
      });
    } else if (splitBy === 'character') {
      return line.split('').map((char, charIndex) => {
        const index = lineIndex * 100 + charIndex;
        return (
          <motion.span
            key={`${lineIndex}-${charIndex}`}
            className="inline-block"
            initial="hidden"
            animate={controls}
            custom={index}
            variants={variants}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      });
    } else {
      const index = lineIndex;
      return (
        <motion.span
          key={lineIndex}
          className="inline-block"
          initial="hidden"
          animate={controls}
          custom={index}
          variants={variants}
        >
          {line}
        </motion.span>
      );
    }
  };

  return (
    <Component
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        className
      )}
      {...props}
    >
      <div className={textClassName}>
        {renderText()}
      </div>
    </Component>
  );
}
