"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote, Users, Award, Heart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
    review: 'Dr. Johnson was absolutely wonderful with my 6-year-old daughter. She made the entire ear tube procedure feel like a game, and my daughter actually looked forward to her follow-up visits. The staff was incredibly patient and caring.',
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
    review: 'After years of hearing loss, Dr. Chen recommended cochlear implants. The surgery was seamless, and the results have been life-changing. I can now hear my grandchildren clearly for the first time in years.',
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
    featured: false,
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
  },
  {
    _id: '5',
    patientName: 'Lisa Park',
    patientImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    review: 'The entire team at ENT Excellence made my tonsillectomy experience as comfortable as possible. From pre-op to recovery, every step was explained clearly, and the pain management was excellent.',
    treatment: 'Tonsillectomy',
    doctorName: 'Dr. Sarah Johnson',
    location: 'Health City, HC',
    isVerified: true,
    featured: false,
    createdAt: '2024-01-03'
  },
  {
    _id: '6',
    patientName: 'Robert Williams',
    patientImage: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    review: 'I was skeptical about hearing aids, but Dr. Chen took the time to find the perfect fit for my lifestyle. The technology is amazing, and the ongoing support has been exceptional.',
    treatment: 'Hearing Aid Consultation',
    doctorName: 'Dr. Michael Chen',
    location: 'Health City, HC',
    isVerified: true,
    featured: false,
    createdAt: '2024-01-01'
  }
];

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Patients" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Award, value: "500+", label: "5-Star Reviews" },
  { icon: Heart, value: "99%", label: "Satisfaction Rate" },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(sampleTestimonials);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredTestimonials = filter === 'featured' 
    ? testimonials.filter(t => t.featured)
    : testimonials;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background pt-32">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Heart className="w-4 h-4 mr-2 text-primary" />
              <span className="text-primary font-medium">Patient Stories</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-manrope text-foreground mb-6">
              What Our Patients
              <span className="text-gradient block">Say About Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Read real stories from our patients who have experienced exceptional care 
              and life-changing treatments at ENT Excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground font-manrope mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-primary hover:bg-primary/90' : ''}
            >
              All Reviews ({testimonials.length})
            </Button>
            <Button
              variant={filter === 'featured' ? 'default' : 'outline'}
              onClick={() => setFilter('featured')}
              className={filter === 'featured' ? 'bg-primary hover:bg-primary/90' : ''}
            >
              Featured ({testimonials.filter(t => t.featured).length})
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl medical-shadow">
                  <div className="animate-pulse">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover-lift group relative overflow-hidden">
                    {testimonial.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      </div>
                    )}
                    
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Quote Icon */}
                      <div className="mb-4">
                        <Quote className="w-8 h-8 text-primary/20" />
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-4">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Review Text */}
                      <blockquote className="text-muted-foreground leading-relaxed mb-6 flex-1">
                        &quot;{testimonial.review}&quot;
                      </blockquote>

                      {/* Treatment */}
                      <div className="mb-4">
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {testimonial.treatment}
                        </span>
                      </div>

                      {/* Patient Info */}
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={testimonial.patientImage}
                              alt={testimonial.patientName}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {testimonial.isVerified && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">
                            {testimonial.patientName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Treated by {testimonial.doctorName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {filteredTestimonials.length === 0 && !loading && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No testimonials found</h3>
              <p className="text-muted-foreground">
                Check back soon for more patient stories.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-manrope">
              Ready to Experience Excellence?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of satisfied patients who have trusted us with their ENT care. 
              Schedule your consultation today and discover the difference expert care makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold">
                Book Your Appointment
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 font-semibold">
                Learn More About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}