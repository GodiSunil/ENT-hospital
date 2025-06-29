'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Tab {
  value: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultValue?: string;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
  orientation?: 'horizontal' | 'vertical';
  showIndicator?: boolean;
  indicatorClassName?: string;
}

export function AnimatedTabs({
  tabs,
  defaultValue,
  className,
  tabClassName,
  activeTabClassName,
  contentClassName,
  orientation = 'horizontal',
  showIndicator = true,
  indicatorClassName = 'bg-primary h-0.5',
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [tabsRefs, setTabsRefs] = useState<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (tabsRefs.length > 0) {
      const activeIndex = tabs.findIndex((tab) => tab.value === activeTab);
      const activeTabRef = tabsRefs[activeIndex];
      
      if (activeTabRef) {
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = activeTabRef;
        
        setIndicatorStyle({
          ...(orientation === 'horizontal' 
            ? { left: offsetLeft, width: offsetWidth }
            : { top: offsetTop, height: offsetHeight }),
        });
      }
    }
  }, [activeTab, tabsRefs, orientation, tabs]);

  const activeContent = tabs.find((tab) => tab.value === activeTab)?.content;

  return (
    <div
      className={cn(
        'w-full',
        orientation === 'vertical' ? 'flex' : 'flex flex-col',
        className
      )}
    >
      <div
        className={cn(
          'relative',
          orientation === 'horizontal' 
            ? 'flex border-b border-border' 
            : 'flex flex-col border-r border-border w-48 flex-shrink-0'
        )}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.value}
            ref={(el) => {
              const refs = [...tabsRefs];
              refs[index] = el;
              setTabsRefs(refs);
            }}
            className={cn(
              'px-4 py-3 text-sm font-medium transition-colors relative z-10',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              'text-muted-foreground hover:text-foreground',
              activeTab === tab.value && 'text-foreground',
              tabClassName,
              activeTab === tab.value && activeTabClassName
            )}
            onClick={() => setActiveTab(tab.value)}
          >
            <div className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </div>
          </button>
        ))}
        {showIndicator && (
          <motion.div
            className={cn(
              'absolute z-0 bg-primary/10',
              orientation === 'horizontal' 
                ? 'bottom-0 h-0.5' 
                : 'right-0 w-0.5',
              indicatorClassName
            )}
            initial={false}
            animate={indicatorStyle}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
          />
        )}
      </div>

      <div className={cn('relative overflow-hidden flex-1', contentClassName)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
