'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../ui/AnimatedSection';
import AnimatedText from '../ui/AnimatedText';
import { fadeIn, fadeInUp, slideInFromLeft, slideInFromRight, scaleUp } from '@/lib/animations';

export function AnimationShowcase() {
  const [activeTab, setActiveTab] = useState('fade');

  const animations = [
    { id: 'fade', name: 'Fade In', variant: fadeIn },
    { id: 'fadeUp', name: 'Fade In Up', variant: fadeInUp },
    { id: 'slideLeft', name: 'Slide In From Left', variant: slideInFromLeft },
    { id: 'slideRight', name: 'Slide In From Right', variant: slideInFromRight },
    { id: 'scale', name: 'Scale Up', variant: scaleUp },
  ];

  const currentAnimation = animations.find(anim => anim.id === activeTab)?.variant || fadeIn;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Animation Showcase</h2>
      
      {/* Animation Selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {animations.map(anim => (
          <button
            key={anim.id}
            onClick={() => setActiveTab(anim.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === anim.id 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            {anim.name}
          </button>
        ))}
      </div>

      {/* Animation Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <AnimatedSection
            key={item}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            animationType={activeTab as any}
            delay={item * 0.1}
          >
            <h3 className="text-xl font-semibold mb-2">Card {item}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This is a sample card with {activeTab} animation.
            </p>
          </AnimatedSection>
        ))}
      </div>

      {/* Text Animation Example */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6 text-center">Text Animation</h3>
        <AnimatedText
          text="Welcome to ENT Excellence - Your Trusted Healthcare Partner"
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          animationType={activeTab as any}
          splitBy="word"
          stagger={0.1}
        />
        <AnimatedText
          text="Our team of experienced specialists is dedicated to providing the highest quality care for all your ear, nose, and throat needs."
          className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto"
          animationType={activeTab as any}
          splitBy="character"
          stagger={0.02}
        />
      </div>

      {/* Staggered List Example */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6 text-center">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Hearing Tests', 'Sinus Treatment', 'Pediatric ENT', 'Allergy Testing', 'Voice Therapy', 'Sleep Apnea'].map((service, index) => (
            <AnimatedSection
              key={service}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              animationType={activeTab as any}
              delay={index * 0.1}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-xl">{index + 1}</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">{service}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Professional {service.toLowerCase()} services provided by our expert team.
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
