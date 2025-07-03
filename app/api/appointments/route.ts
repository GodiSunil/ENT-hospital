import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Appointment from '@/lib/models/Appointment';
import Doctor from '@/lib/models/Doctor';
import { sendAppointmentConfirmation } from '@/lib/email';
import { v4 as uuidv4 } from 'uuid';

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

    // Generate a unique reference number
    const referenceNumber = `APPT-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // Create new appointment
    const appointment = new Appointment({
      ...body,
      appointmentDate: new Date(body.appointmentDate),
      referenceNumber,
      status: 'confirmed'
    });

    await appointment.save();

    // Send confirmation email
    const emailSent = await sendAppointmentConfirmation(
      body.patientEmail,
      body.patientName,
      {
        date: new Date(body.appointmentDate).toLocaleDateString(),
        time: body.appointmentTime,
        doctorName: doctor.name,
        appointmentId: referenceNumber
      }
    );

    if (!emailSent) {
      console.warn('Failed to send confirmation email for appointment:', referenceNumber);
    }

    return NextResponse.json(
      { 
        message: 'Appointment booked successfully', 
        appointment: {
          ...appointment.toObject(),
          referenceNumber,
          doctorName: doctor.name
        } 
      },
      { status: 201 }
    );

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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let query: any = {};
    
    if (doctorId) {
      query.doctorId = doctorId;
    }
    
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      query.appointmentDate = {
        $gte: startDate,
        $lte: endDate
      };
    }

    if (status) {
      query.status = status;
    }
    
    const total = await Appointment.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    
    const appointments = await Appointment.find(query)
      .populate('doctorId', 'name specialization')
      .sort({ appointmentDate: 1, appointmentTime: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    return NextResponse.json({ 
      appointments,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}