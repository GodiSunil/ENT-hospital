export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string[];
  experience: number;
  image: string;
  bio: string;
  rating: number;
  reviews: number;
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  certifications: string[];
  languages: string[];
  availability: {
    day: string;
    time: string;
  }[];
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  services: string[];
  achievements: string[];
  consultationFee: number;
}

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'MD, FACS',
    specialty: ['General ENT', 'Pediatric ENT'],
    experience: 15,
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Dr. Johnson specializes in comprehensive ENT care with a focus on pediatric patients. She has over 15 years of experience and is known for her gentle approach with children.',
    rating: 4.9,
    reviews: 127,
    education: [
      { degree: 'MD', institution: 'Harvard Medical School', year: 2008 },
      { degree: 'Residency in Otolaryngology', institution: 'Johns Hopkins Hospital', year: 2013 },
      { degree: 'Fellowship in Pediatric Otolaryngology', institution: 'Boston Children\'s Hospital', year: 2014 }
    ],
    certifications: [
      'American Board of Otolaryngology',
      'Fellow of the American College of Surgeons',
      'Pediatric Advanced Life Support (PALS)'
    ],
    languages: ['English', 'Spanish'],
    availability: [
      { day: 'Monday', time: '9:00 AM - 5:00 PM' },
      { day: 'Wednesday', time: '9:00 AM - 5:00 PM' },
      { day: 'Friday', time: '9:00 AM - 3:00 PM' }
    ],
    contact: {
      email: 's.johnson@entclinic.com',
      phone: '(555) 123-4567',
      location: '123 Medical Center Drive, Suite 400, New York, NY 10001'
    },
    services: [
      'Pediatric ENT Care',
      'Ear Tubes',
      'Tonsillectomy & Adenoidectomy',
      'Sinus Surgery',
      'Hearing Tests',
      'Allergy Testing'
    ],
    achievements: [
      'Best Pediatric ENT 2023 - National Medical Association',
      'Patient Choice Award 2022',
      'Top Doctor - New York Magazine 2021-2023'
    ],
    consultationFee: 250
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'MD, PhD',
    specialty: ['Otology', 'Audiology'],
    experience: 20,
    image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Dr. Chen is a leading expert in hearing disorders and cochlear implants. His research has been published in numerous medical journals.',
    rating: 4.8,
    reviews: 89,
    education: [
      { degree: 'MD, PhD in Neuroscience', institution: 'Stanford University', year: 2003 },
      { degree: 'Residency in Otolaryngology', institution: 'Massachusetts Eye and Ear', year: 2009 },
      { degree: 'Fellowship in Neurotology', institution: 'UCSF Medical Center', year: 2011 }
    ],
    certifications: [
      'American Board of Otolaryngology',
      'Neurotology Board Certified',
      'Cochlear Implant Specialist'
    ],
    languages: ['English', 'Mandarin'],
    availability: [
      { day: 'Tuesday', time: '8:00 AM - 4:00 PM' },
      { day: 'Thursday', time: '8:00 AM - 4:00 PM' },
      { day: 'Saturday', time: '9:00 AM - 1:00 PM' }
    ],
    contact: {
      email: 'm.chen@entclinic.com',
      phone: '(555) 987-6543',
      location: '456 Hearing Center, 2nd Floor, New York, NY 10001'
    },
    services: [
      'Cochlear Implants',
      'Hearing Aids',
      'Tympanoplasty',
      'Stapedectomy',
      'Balance Disorders',
      'Tinnitus Treatment'
    ],
    achievements: [
      'Research Excellence Award - American Otological Society',
      'Top Doctor 2024 - US News & World Report',
      'Innovation in Otology Award 2022'
    ],
    consultationFee: 300
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    title: 'MD, MS',
    specialty: ['Rhinology', 'Allergy'],
    experience: 12,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Dr. Rodriguez specializes in sinus disorders and allergic conditions. She uses the latest minimally invasive techniques for optimal patient outcomes.',
    rating: 4.9,
    reviews: 156,
    education: [
      { degree: 'MD', institution: 'Mayo Clinic Alix School of Medicine', year: 2011 },
      { degree: 'MS in Clinical Research', institution: 'Mayo Clinic Graduate School', year: 2013 },
      { degree: 'Fellowship in Rhinology', institution: 'Cleveland Clinic', year: 2015 }
    ],
    certifications: [
      'American Board of Otolaryngology',
      'Fellowship in Rhinology and Skull Base Surgery',
      'Allergy Testing and Immunotherapy Certified'
    ],
    languages: ['English', 'Spanish', 'Portuguese'],
    availability: [
      { day: 'Monday', time: '8:30 AM - 4:30 PM' },
      { day: 'Wednesday', time: '8:30 AM - 4:30 PM' },
      { day: 'Friday', time: '7:30 AM - 3:30 PM' }
    ],
    contact: {
      email: 'e.rodriguez@entclinic.com',
      phone: '(555) 456-7890',
      location: '789 Sinus Center, 3rd Floor, New York, NY 10001'
    },
    services: [
      'Endoscopic Sinus Surgery',
      'Balloon Sinuplasty',
      'Deviated Septum Repair',
      'Allergy Testing & Treatment',
      'Nasal Obstruction',
      'Skull Base Surgery'
    ],
    achievements: [
      'Excellence in Sinus Surgery - American Rhinologic Society',
      'Compassionate Care Award 2023',
      'Top 40 Under 40 in Medicine - 2022'
    ],
    consultationFee: 275
  }
];

export const getDoctorById = (id: string): Doctor | undefined => {
  return doctors.find(doctor => doctor.id === id);
};

export const getAllDoctors = (): Doctor[] => {
  return doctors;
};
