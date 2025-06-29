"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ENT_CAROUSEL_ITEMS = [
  {
    id: 1,
    title: 'Advanced ENT Care',
    description: 'State-of-the-art facilities for comprehensive ear, nose, and throat treatments',
    image: 'https://media.istockphoto.com/id/1372093909/vector/doctor-advises-patient-about-treatment-of-disease-otolaryngologist-with-medical-instrument.jpg?s=612x612&w=0&k=20&c=8bBFoOiEDgcEe5FpDHoPgkc4mD13Jz37D9FSvATgbfo=',
  },
  {
    id: 2,
    title: 'Expert ENT Specialists',
    description: 'Our team of experienced ENT doctors providing personalized care',
    image: 'https://media.istockphoto.com/id/1193751702/vector/ent-logo-template-head-for-ear-nose-throat-doctor-specialists.jpg?s=612x612&w=0&k=20&c=GxokBxvyqaYzuoDDnWQ8mpfMJeN-qj6vGU8174TyxKY=',
  },
  {
    id: 3,
    title: 'Hearing Solutions',
    description: 'Comprehensive hearing tests and advanced hearing aid solutions',
    image: 'https://media.istockphoto.com/id/1410779156/vector/ent-doctor-examines-childs-ear-with-instrument-removes-sulfur-plug-n.jpg?s=612x612&w=0&k=20&c=CNBEFZ2yx5lEwW_Px7iNrEvlw-V4rN6y2jAMtjMXYnw=',
  },
  {
    id: 4,
    title: 'Pediatric ENT Care',
    description: 'Specialized care for children with ear, nose, and throat conditions',
    image: 'https://media.istockphoto.com/id/2149994905/vector/male-and-female-doctors-cartoon-characters-set.jpg?s=612x612&w=0&k=20&c=Ph4QBj5HDkJii2a3-7KAfw_l-lMtsEOFMO8reFH1-dE=',
  },
  {
    id: 5,
    title: 'Sinus Treatment',
    description: 'Advanced treatments for sinus conditions and allergies',
    image: 'https://media.istockphoto.com/id/2113460613/vector/3d-isometric-flat-vector-conceptual-illustration-of-otolaryngologist.jpg?s=612x612&w=0&k=20&c=HoahpuCQZIrsYc0zDI2PgbKEHO-kPoDDqNPqDkvFx58=',
  },
];

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const EntCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Create duplicated items for infinite scroll effect
  const items: CarouselItem[] = [...ENT_CAROUSEL_ITEMS, ...ENT_CAROUSEL_ITEMS];

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % ENT_CAROUSEL_ITEMS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + ENT_CAROUSEL_ITEMS.length) % ENT_CAROUSEL_ITEMS.length);
  }, []);

  // Auto-scroll to next slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide();
    }
  };

  return (
    <div 
      className="relative w-full h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-full">
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div 
            ref={carouselRef}
            className="relative w-full h-full flex items-center"
            initial={false}
            animate={{
              x: `${-currentIndex * 100}%`,
              transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-full h-full flex items-center justify-center px-4"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0.5,
                  scale: index === currentIndex ? 1 : 0.9,
                  zIndex: index === currentIndex ? 10 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut'
                }}
              >
                <div className="relative w-full h-[80%] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 100vw"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h3>
                    <p className="text-base md:text-lg text-white/90">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {ENT_CAROUSEL_ITEMS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex % ENT_CAROUSEL_ITEMS.length 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
