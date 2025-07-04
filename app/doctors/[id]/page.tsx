import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin, Clock, Users, Calendar, Check, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// This would normally come from your database/API
const sampleDoctors = [
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
    awards: ['Best Pediatric ENT 2023', 'Patient Choice Award'],
    about: 'Dr. Sarah Johnson is a board-certified ENT specialist with over 15 years of experience in pediatric otolaryngology. She completed her medical degree at Harvard Medical School and her residency at Johns Hopkins Hospital. Dr. Johnson is passionate about providing compassionate, family-centered care to children with ear, nose, and throat conditions.',
    educationDetails: [
      { degree: 'MD', institution: 'Harvard Medical School', year: 2008 },
      { degree: 'Residency in Otolaryngology', institution: 'Johns Hopkins Hospital', year: 2013 },
      { degree: 'Fellowship in Pediatric Otolaryngology', institution: 'Boston Children\'s Hospital', year: 2014 }
    ],
    experienceDetails: [
      { position: 'Senior ENT Consultant', hospital: 'Children\'s Medical Center', years: '2014 - Present' },
      { position: 'ENT Specialist', hospital: 'Massachusetts General Hospital', years: '2010 - 2014' },
      { position: 'Resident Physician', hospital: 'Johns Hopkins Hospital', years: '2008 - 2013' }
    ],
    contact: {
      phone: '(555) 123-4567',
      email: 's.johnson@entclinic.com',
      address: '123 Medical Center Drive, Boston, MA 02115',
      workingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      emergencyHours: '24/7 Emergency Care Available'
    },
    services: [
      'Pediatric Ear Infections',
      'Tonsillectomy & Adenoidectomy',
      'Ear Tubes',
      'Hearing Tests',
      'Allergy Testing',
      'Sinus Surgery',
      'Voice & Swallowing Disorders',
      'Sleep Apnea Treatment'
    ],
    reviews: [
      { name: 'Jennifer K.', rating: 5, comment: 'Dr. Johnson was amazing with my son. She explained everything clearly and made him feel at ease.' },
      { name: 'Robert M.', rating: 5, comment: 'Highly recommend Dr. Johnson. She\'s patient, knowledgeable, and truly cares about her patients.' },
      { name: 'Sarah T.', rating: 4, comment: 'Great experience overall. The wait time was a bit long, but Dr. Johnson was worth the wait.' }
    ]
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
    awards: ['Research Excellence Award', 'Top Doctor 2024'],
    about: 'Dr. Michael Chen is a renowned otologist and neurotologist with over 20 years of experience in treating complex ear disorders. He completed his MD/PhD at Stanford University and his fellowship in Otology/Neurotology at UCSF. Dr. Chen is a pioneer in minimally invasive ear surgery and has published over 100 peer-reviewed articles.',
    educationDetails: [
      { degree: 'MD, PhD in Neuroscience', institution: 'Stanford University', year: 2003 },
      { degree: 'Residency in Otolaryngology', institution: 'Johns Hopkins Hospital', year: 2008 },
      { degree: 'Fellowship in Otology/Neurotology', institution: 'UCSF Medical Center', year: 2010 }
    ],
    experienceDetails: [
      { position: 'Director of Otology', hospital: 'San Francisco Ear Institute', years: '2015 - Present' },
      { position: 'Associate Professor', hospital: 'UCSF School of Medicine', years: '2012 - Present' },
      { position: 'Otology Consultant', hospital: 'Stanford Health Care', years: '2010 - 2015' }
    ],
    contact: {
      phone: '(555) 234-5678',
      email: 'm.chen@entclinic.com',
      address: '456 Medical Plaza, San Francisco, CA 94143',
      workingHours: 'Mon, Wed, Fri: 9:00 AM - 4:00 PM',
      emergencyHours: '24/7 On-Call for Emergencies'
    },
    services: [
      'Cochlear Implants',
      'Hearing Restoration Surgery',
      'Acoustic Neuroma',
      'Cholesteatoma Surgery',
      'Tinnitus Treatment',
      'Balance Disorders',
      'Ear Drum Repair',
      'Skull Base Surgery'
    ],
    reviews: [
      { name: 'David L.', rating: 5, comment: 'Dr. Chen performed my cochlear implant surgery and changed my life. His expertise is unmatched.' },
      { name: 'Emily R.', rating: 5, comment: 'Brilliant surgeon and compassionate doctor. Took the time to explain everything in detail.' },
      { name: 'James W.', rating: 4, comment: 'Very knowledgeable and professional. The office staff was friendly and efficient.' }
    ]
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
    awards: ['Excellence in Sinus Surgery', 'Compassionate Care Award'],
    about: 'Dr. Emily Rodriguez is a fellowship-trained rhinologist and endoscopic sinus surgeon with expertise in complex sinus and skull base disorders. She completed her medical training at Mayo Clinic and her rhinology fellowship at Cleveland Clinic. Dr. Rodriguez is known for her patient-centered approach and commitment to advancing minimally invasive surgical techniques.',
    educationDetails: [
      { degree: 'MD', institution: 'Mayo Clinic Alix School of Medicine', year: 2011 },
      { degree: 'Master of Science in Clinical Research', institution: 'Mayo Graduate School', year: 2013 },
      { degree: 'Residency in Otolaryngology', institution: 'Mayo Clinic', year: 2016 },
      { degree: 'Fellowship in Rhinology & Skull Base Surgery', institution: 'Cleveland Clinic', year: 2017 }
    ],
    experienceDetails: [
      { position: 'Director of Rhinology', hospital: 'Miami Sinus Center', years: '2019 - Present' },
      { position: 'Assistant Professor', hospital: 'University of Miami Miller School of Medicine', years: '2017 - Present' },
      { position: 'Rhinology Fellow', hospital: 'Cleveland Clinic', years: '2016 - 2017' }
    ],
    contact: {
      phone: '(555) 345-6789',
      email: 'e.rodriguez@entclinic.com',
      address: '789 Medical Way, Miami, FL 33136',
      workingHours: 'Tue, Thu: 8:30 AM - 5:00 PM',
      emergencyHours: '24/7 Emergency Consultations'
    },
    services: [
      'Endoscopic Sinus Surgery',
      'Balloon Sinuplasty',
      'Deviated Septum Repair',
      'Allergy Testing & Treatment',
      'Nasal Polyps',
      'Chronic Sinusitis',
      'Skull Base Tumors',
      'Nasal Obstruction'
    ],
    reviews: [
      { name: 'Maria G.', rating: 5, comment: 'Dr. Rodriguez is amazing! She helped me breathe better than I have in years.' },
      { name: 'Carlos M.', rating: 5, comment: 'Professional, knowledgeable, and caring. The entire experience was excellent.' },
      { name: 'Sofia R.', rating: 4, comment: 'Great doctor. The only reason I didn\'t give 5 stars is the wait time can be long.' }
    ]
  }
];

export default function DoctorProfile({ params }: { params: { id: string } }) {
  const doctor = sampleDoctors.find(doc => doc._id === params.id);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
                  <p className="text-primary font-medium">{doctor.title}</p>
                  
                  <div className="flex items-center mt-4">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({doctor.totalReviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{doctor.contact.address}</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700">{doctor.contact.workingHours}</p>
                        <p className="text-sm text-gray-500">{doctor.contact.emergencyHours}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <a href={`tel:${doctor.contact.phone.replace(/\D/g, '')}`} className="text-primary hover:underline">
                        {doctor.contact.phone}
                      </a>
                    </div>
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <a href={`mailto:${doctor.contact.email}`} className="text-primary hover:underline">
                        {doctor.contact.email}
                      </a>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6" size="lg">
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 mt-8 md:mt-0">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About Dr. {doctor.name.split(' ').pop()}</h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="text-lg mb-6">{doctor.about}</p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {doctor.specialization.map((spec) => (
                      <span key={spec} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {spec}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Education</h3>
                  <div className="space-y-4 mb-8">
                    {doctor.educationDetails.map((edu, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                          <Check className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                          <p className="text-gray-600">{edu.institution} • {edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Experience</h3>
                  <div className="space-y-4 mb-8">
                    {doctor.experienceDetails.map((exp, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{exp.position}</h4>
                          <p className="text-gray-600">{exp.hospital} • {exp.years}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {doctor.services.map((service, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Languages Spoken</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {doctor.languages.map((language) => (
                      <span key={language} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {language}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Patient Reviews</h3>
                  <div className="space-y-6">
                    {doctor.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{review.name}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-12 text-center">
                  <Button size="lg" className="px-8">
                    Book an Appointment with Dr. {doctor.name.split(' ').pop()}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Doctors Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/about#meet-our-team" 
          className="inline-flex items-center text-primary hover:underline font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Our Team
        </Link>
      </div>
    </div>
  );
}
