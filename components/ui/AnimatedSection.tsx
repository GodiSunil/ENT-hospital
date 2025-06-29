'use client';

import React, { ReactNode, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimatedSectionProps<T extends React.ElementType = 'div'> = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  animateOnce?: boolean;
  animationType?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'custom';
  customVariants?: Variants;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'ref'>;

export const AnimatedSection = React.forwardRef(
  <T extends React.ElementType = 'div'>({
    children,
    className,
    delay = 0,
    duration = 0.6,
    yOffset = 20,
    xOffset = 0,
    scale = 1,
    once = true,
    amount = 0.1,
    animateOnce = true,
    animationType = 'fadeIn',
    customVariants,
    as,
    ...props
  }: AnimatedSectionProps<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
    const Component = as || 'div';
    const localRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => localRef.current as HTMLDivElement);
    const controls = useAnimation();
    const isInView = useInView(localRef, {
      amount,
      once: animateOnce,
    });

    const animations = {
      fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      },
      slideUp: {
        hidden: { opacity: 0, y: yOffset },
        visible: { opacity: 1, y: 0 },
      },
      slideDown: {
        hidden: { opacity: 0, y: -yOffset },
        visible: { opacity: 1, y: 0 },
      },
      slideLeft: {
        hidden: { opacity: 0, x: xOffset || 50 },
        visible: { opacity: 1, x: 0 },
      },
      slideRight: {
        hidden: { opacity: 0, x: xOffset || -50 },
        visible: { opacity: 1, x: 0 },
      },
      scale: {
        hidden: { opacity: 0, scale: scale - 0.1 },
        visible: { opacity: 1, scale: 1 },
      },
      custom: customVariants || {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      },
    };

    const variants = customVariants || animations[animationType] || animations.fadeIn;

    useEffect(() => {
      if (isInView) {
        controls.start('visible');
      } else if (!once) {
        controls.start('hidden');
      }
    }, [controls, isInView, once]);

    return (
      <Component
        ref={localRef}
        className={cn(
          'relative overflow-hidden',
          className
        )}
        {...props}
      >
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{
            duration,
            delay,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </Component>
    );
  }
);

interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
  animationType?: AnimatedSectionProps['animationType'];
  as?: keyof JSX.IntrinsicElements;
}

export function AnimatedList<T>({
  items,
  renderItem,
  className,
  itemClassName,
  staggerDelay = 0.1,
  animationType = 'slideUp',
  as: Component = 'div',
}: AnimatedListProps<T>) {
  return (
    <Component className={cn('space-y-4', className)}>
      {items.map((item, index) => (
        <AnimatedSection
          key={index}
          delay={index * staggerDelay}
          animationType={animationType}
          className={itemClassName}
          as="div"
        >
          {renderItem(item, index)}
        </AnimatedSection>
      ))}
    </Component>
  );
}
