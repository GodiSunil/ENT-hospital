import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Appointment from '@/lib/models/Appointment';
import Doctor from '@/lib/models/Doctor';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['patientName', 'patientEmail', 'patientPhone', 'patientAge', 'doctorId', 'appointmentDate', 'appointmentTime', 'reason'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Verify doctor exists
    const doctor = await Doctor.findById(body.doctorId);
    if (!doctor) {
      return NextResponse.json(
        { error: 'Doctor not found' },
        { status: 404 }
      );
    }

    // Check for duplicate appointments
    const existingAppointment = await Appointment.findOne({
      doctorId: body.doctorId,
      appointmentDate: new Date(body.appointmentDate),
      appointmentTime: body.appointmentTime
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 409 }
      );
    }

    // Create new appointment
    const appointment = new Appointment({
      ...body,
      appointmentDate: new Date(body.appointmentDate)
    });

    await appointment.save();

    // Populate doctor details for response
    await appointment.populate('doctorId', 'name title specialization');

    return NextResponse.json({
      success: true,
      appointment
    }, { status: 201 });

  } catch (error) {
    console.error('Appointment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('doctorId');
    const date = searchParams.get('date');
    const status = searchParams.get('status');

    let query: any = {};
    
    if (doctorId) query.doctorId = doctorId;
    if (date) query.appointmentDate = new Date(date);
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate('doctorId', 'name title specialization')
      .sort({ appointmentDate: 1, appointmentTime: 1 });

    return NextResponse.json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error('Appointments fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}