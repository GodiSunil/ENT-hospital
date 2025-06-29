import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Doctor from '@/lib/models/Doctor';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get('specialization');
    const isActive = searchParams.get('isActive');

    let query: any = {};
    
    if (specialization) {
      query.specialization = { $in: [specialization] };
    }
    
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    } else {
      query.isActive = true; // Default to active doctors only
    }

    const doctors = await Doctor.find(query).sort({ name: 1 });

    return NextResponse.json({
      success: true,
      doctors
    });

  } catch (error) {
    console.error('Doctors fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'title', 'specialization', 'experience', 'education', 'image', 'bio', 'consultationFee'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const doctor = new Doctor(body);
    await doctor.save();

    return NextResponse.json({
      success: true,
      doctor
    }, { status: 201 });

  } catch (error) {
    console.error('Doctor creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create doctor' },
      { status: 500 }
    );
  }
}