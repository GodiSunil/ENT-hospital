import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Mock patient data - in a real app, this would come from a database
const mockPatient = {
  id: '1',
  email: 'patient@example.com',
  name: 'John Patient',
  dateOfBirth: '1985-04-15',
  phone: '+1234567890',
  address: '123 Medical St, Health City',
  bloodType: 'A+',
  allergies: ['Penicillin', 'Peanuts'],
  medications: ['Lisinopril 10mg', 'Metformin 500mg'],
  conditions: ['Hypertension', 'Type 2 Diabetes']
};

export async function GET(request: Request) {
  try {
    // In a real app, you would verify the JWT token
    // const token = await getToken({ req: request });
    // if (!token) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
    // For demo, just return the mock patient data
    return NextResponse.json(mockPatient);
    
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patient profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // In a real app, you would verify the JWT token
    // const token = await getToken({ req: request });
    // if (!token) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
    const updates = await request.json();
    
    // In a real app, you would update the patient in the database
    console.log('Updating patient profile with:', updates);
    
    // For demo, just return the updated data
    const updatedPatient = { ...mockPatient, ...updates };
    
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      patient: updatedPatient
    });
    
  } catch (error) {
    console.error('Error updating patient profile:', error);
    return NextResponse.json(
      { error: 'Failed to update patient profile' },
      { status: 500 }
    );
  }
}
