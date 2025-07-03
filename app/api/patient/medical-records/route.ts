import { NextResponse } from 'next/server';

// Mock medical records data
const mockMedicalRecords = [
  {
    id: '1',
    date: '2025-06-15',
    doctor: 'Dr. Smith',
    specialty: 'ENT Specialist',
    diagnosis: 'Acute Sinusitis',
    notes: 'Patient presented with sinus pressure and congestion. Prescribed antibiotics and nasal spray.',
    medications: ['Amoxicillin 500mg', 'Fluticasone nasal spray'],
    followUp: '2025-07-15'
  },
  {
    id: '2',
    date: '2025-05-10',
    doctor: 'Dr. Johnson',
    specialty: 'Audiologist',
    diagnosis: 'Mild Hearing Loss',
    notes: 'Hearing test showed mild high-frequency hearing loss. Recommended hearing protection in noisy environments.',
    medications: [],
    followUp: '2025-11-10'
  },
  {
    id: '3',
    date: '2025-01-20',
    doctor: 'Dr. Smith',
    specialty: 'ENT Specialist',
    diagnosis: 'Tonsillitis',
    notes: 'Patient had swollen tonsils with white patches. Prescribed antibiotics and recommended rest.',
    medications: ['Penicillin VK'],
    followUp: null
  }
];

export async function GET() {
  try {
    // In a real app, you would:
    // 1. Verify the JWT token
    // 2. Fetch records from a database
    // 3. Return only the records belonging to the authenticated patient
    
    // For demo, return mock data
    return NextResponse.json(mockMedicalRecords);
    
  } catch (error) {
    console.error('Error fetching medical records:', error);
    return NextResponse.json(
      { error: 'Failed to fetch medical records' },
      { status: 500 }
    );
  }
}

// Add other HTTP methods as needed (POST, PUT, DELETE)
