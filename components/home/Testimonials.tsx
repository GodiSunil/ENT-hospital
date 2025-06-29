"use client";

import { motion } from 'framer-motion';
import { cn } from "@/lib/utils"
import { TestimonialCard } from "@/components/ui/testimonial-card"

interface Testimonial {
  _id: string;
  patientName: string;
  patientImage: string;
  rating: number;
  review: string;
  treatment: string;
  doctorName: string;
  location: string;
  isVerified: boolean;
  featured: boolean;
  createdAt: string;
}

// Sample testimonials data
const sampleTestimonials: Testimonial[] = [
  {
    _id: '1',
    patientName: 'Sarah Mitchell',
    patientImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    review: 'Dr. Johnson was absolutely wonderful with my 6-year-old daughter. She made the entire ear tube procedure feel like a game, and my daughter actually looked forward to her follow-up visits.',
    treatment: 'Pediatric Ear Tube Surgery',
    doctorName: 'Dr. Sarah Johnson',
    location: 'Health City, HC',
    isVerified: true,
    featured: true,
    createdAt: '2024-01-15'
  },
  {
    _id: '2',
    patientName: 'Michael Rodriguez',
    patientImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    review: 'After years of hearing loss, Dr. Chen recommended cochlear implants. The surgery was seamless, and the results have been life-changing.',
    treatment: 'Cochlear Implant Surgery',
    doctorName: 'Dr. Michael Chen',
    location: 'Health City, HC',
    isVerified: true,
    featured: true,
    createdAt: '2024-01-10'
  },
  {
    _id: '3',
    patientName: 'Emily Thompson',
    patientImage: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    review: 'I suffered from chronic sinusitis for over 10 years. Dr. Rodriguez performed endoscopic sinus surgery, and I can finally breathe freely again. The minimally invasive approach meant quick recovery too.',
    treatment: 'Endoscopic Sinus Surgery',
    doctorName: 'Dr. Emily Rodriguez',
    location: 'Health City, HC',
    isVerified: true,
    featured: true,
    createdAt: '2024-01-08'
  },
  {
    _id: '4',
    patientName: 'David Chen',
    patientImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    review: 'As a professional singer, my voice is everything. Dr. Wilson diagnosed and treated my vocal cord polyps with incredible precision. My voice is now stronger than ever, and my career is back on track.',
    treatment: 'Vocal Cord Surgery',
    doctorName: 'Dr. James Wilson',
    location: 'Health City, HC',
    isVerified: true,
    featured: true,
    createdAt: '2024-01-05'
  }
];

export default function Testimonials() {
  // Transform testimonials to match the new card format and duplicate for seamless loop
  const testimonials = Array(3).fill(sampleTestimonials).flat().map((testimonial, index) => ({
    author: {
      name: testimonial.patientName,
      handle: testimonial.treatment,
      avatar: testimonial.patientImage
    },
    text: testimonial.review,
    rating: testimonial.rating,
    id: `${testimonial._id}-${index}` // Add unique ID for each card
  }));

  return (
    <section className="py-20 bg-sky-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <span className="mr-2">★</span>
            Patient Testimonials
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-manrope text-foreground mb-6"
          >
            What Our Patients Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Hear from our patients about their experiences and the care they received at our clinic.
          </motion.p>
        </div>

        {/* Continuous Marquee Section */}
        <div className="relative w-full overflow-hidden">
          <div className="group flex py-4 [--gap:1.5rem] [gap:var(--gap)]">
            <div className="flex shrink-0 [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused] min-w-full">
              {testimonials.map((testimonial, i) => (
                <motion.div 
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  viewport={{ once: true }}
                  className="w-[320px] flex-shrink-0"
                >
                  <TestimonialCard 
                    author={testimonial.author}
                    text={testimonial.text}
                    className="h-full border-2 border-gray-400 dark:border-gray-600 hover:border-primary/70 dark:hover:border-primary/70 transition-colors duration-600"
                  />
                </motion.div>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div 
              aria-hidden="true" 
              className="flex shrink-0 [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused] min-w-full"
            >
              {testimonials.map((testimonial, i) => (
                <div key={`duplicate-${testimonial.id}`} className="w-[320px] flex-shrink-0">
                  <TestimonialCard 
                    author={testimonial.author}
                    text={testimonial.text}
                    className="h-full border-2 border-gray-800 dark:border-gray-600 hover:border-primary/70 dark:hover:border-primary/70 transition-colors duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-sky-50 to-transparent dark:from-gray-900 dark:to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-sky-50 to-transparent dark:from-gray-900 dark:to-transparent" />
        </div>
      </div>
    </section>
  );
}
