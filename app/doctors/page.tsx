"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Clock, Award, Users, Calendar, Filter, Search } from 'lucide-react';
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

// Sample doctors data (in real app, this would come from API)
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
  },
  {
    _id: '4',
    name: 'Dr. James Wilson',
    title: 'MD, FACS',
    specialization: ['Head & Neck Surgery', 'Laryngology'],
    experience: 18,
    education: ['Johns Hopkins', 'MD Anderson Fellowship'],
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Dr. Wilson is a renowned head and neck surgeon with expertise in complex reconstructive procedures and voice disorders.',
    languages: ['English'],
    rating: 4.7,
    totalReviews: 203,
    consultationFee: 350,
    isActive: true,
    awards: ['Surgical Excellence Award', 'Innovation in Medicine']
  }
];

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>(sampleDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(sampleDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [loading, setLoading] = useState(false);

  const filterDoctors = useCallback(() => {
    let filtered = doctors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.some(spec => 
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by specialization
    if (selectedSpecialization !== 'All Specializations') {
      filtered = filtered.filter(doctor =>
        doctor.specialization.includes(selectedSpecialization)
      );
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, selectedSpecialization, doctors]);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, selectedSpecialization, doctors, filterDoctors]);

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
              <Users className="w-4 h-4 mr-2 text-primary" />
              <span className="text-primary font-medium">Our Medical Team</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-manrope text-foreground mb-6">
              Meet Our Expert
              <span className="text-gradient block">ENT Specialists</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our board-certified ENT specialists bring years of experience and expertise 
              to provide you with the highest quality care for all your ear, nose, and throat needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
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
            <div className="text-sm text-muted-foreground">
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl medical-shadow">
                  <div className="animate-pulse">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl medical-shadow hover-lift group"
                >
                  {/* Doctor Image */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-primary/10">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {doctor.awards.length > 0 && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Doctor Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold font-manrope text-foreground mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-primary font-medium mb-2">{doctor.title}</p>
                    <div className="flex flex-wrap justify-center gap-1 mb-3">
                      {doctor.specialization.slice(0, 2).map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        ({doctor.totalReviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Experience & Languages */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Experience:</span>
                      <span className="font-medium">{doctor.experience} years</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Consultation:</span>
                      <span className="font-medium">${doctor.consultationFee}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Languages: </span>
                      <span className="font-medium">{doctor.languages.join(', ')}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                    {doctor.bio}
                  </p>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Link href={`/book-appointment?doctor=${doctor._id}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                    </Link>
                    <Link href={`/doctors/${doctor._id}`}>
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredDoctors.length === 0 && !loading && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No doctors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse all doctors.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}