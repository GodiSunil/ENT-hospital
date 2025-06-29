"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, MapPin, Clock, Users, Calendar, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Doctor {
  _id: string;
  name: string;
  title: string;
  specialization: string[];
  experience: number;
  education: string[];
  image: string;
  bio: string;
  languages: string[];
  rating: number;
  totalReviews: number;
  consultationFee: number;
  isActive: boolean;
  awards: string[];
}

const specializations = [
  'All Specializations',
  'General ENT',
  'Pediatric ENT',
  'Otology',
  'Rhinology',
  'Laryngology',
  'Head & Neck Surgery',
  'Audiology',
  'Voice Therapy'
];

// Sample doctors data
const sampleDoctors: Doctor[] = [
  {
    _id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'MD, FACS',
    specialization: ['General ENT', 'Pediatric ENT'],
    experience: 15,
    education: ['Harvard Medical School', 'Johns Hopkins Residency'],
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Dr. Johnson specializes in comprehensive ENT care with a focus on pediatric patients. She has over 15 years of experience and is known for her gentle approach with children.',
    languages: ['English', 'Spanish'],
    rating: 4.9,
    totalReviews: 127,
    consultationFee: 250,
    isActive: true,
    awards: ['Best Pediatric ENT 2023', 'Patient Choice Award']
  },
  {
    _id: '2',
    name: 'Dr. Michael Chen',
    title: 'MD, PhD',
    specialization: ['Otology', 'Audiology'],
    experience: 20,
    education: ['Stanford Medical School', 'UCSF Fellowship'],
    image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Dr. Chen is a leading expert in hearing disorders and cochlear implants. His research has been published in numerous medical journals.',
    languages: ['English', 'Mandarin'],
    rating: 4.8,
    totalReviews: 89,
    consultationFee: 300,
    isActive: true,
    awards: ['Research Excellence Award', 'Top Doctor 2024']
  },
  {
    _id: '3',
    name: 'Dr. Emily Rodriguez',
    title: 'MD, MS',
    specialization: ['Rhinology', 'Allergy'],
    experience: 12,
    education: ['Mayo Clinic', 'Cleveland Clinic Fellowship'],
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Dr. Rodriguez specializes in sinus disorders and allergic conditions. She uses the latest minimally invasive techniques for optimal patient outcomes.',
    languages: ['English', 'Spanish', 'Portuguese'],
    rating: 4.9,
    totalReviews: 156,
    consultationFee: 275,
    isActive: true,
    awards: ['Excellence in Sinus Surgery', 'Compassionate Care Award']
  }
];

export default function Doctors() {
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(sampleDoctors);

  useEffect(() => {
    let result = [...sampleDoctors];
    
    if (selectedSpecialization !== 'All Specializations') {
      result = result.filter(doctor => 
        doctor.specialization.includes(selectedSpecialization)
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.some(spec => spec.toLowerCase().includes(query)) ||
        doctor.bio.toLowerCase().includes(query)
      );
    }
    
    setFilteredDoctors(result);
  }, [selectedSpecialization, searchQuery]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-manrope text-foreground mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our board-certified ENT specialists bring years of experience and expertise to provide you with the highest quality care.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search doctors by name or specialty..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select 
            value={selectedSpecialization} 
            onValueChange={setSelectedSpecialization}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{doctor.name}</h3>
                      <p className="text-primary font-medium">{doctor.title}</p>
                    </div>
                    <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      <span>{doctor.rating}</span>
                      <span className="text-muted-foreground text-xs ml-1">({doctor.totalReviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doctor.specialization.map((spec) => (
                      <span key={spec} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {doctor.bio}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{doctor.experience}+ years</span>
                    </div>
                    <Button size="sm">View Profile</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">No doctors found matching your criteria</h3>
            <Button 
              variant="ghost" 
              className="mt-4"
              onClick={() => {
                setSelectedSpecialization('All Specializations');
                setSearchQuery('');
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
