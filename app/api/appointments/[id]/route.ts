import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import Appointment from '@/lib/models/Appointment';

// GET: Get appointment by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const appointment = await Appointment.findById(params.id)
      .populate('doctorId', 'name specialization');
    
    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ appointment });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointment' },
      { status: 500 }
    );
  }
}

// PATCH: Update appointment status
// This endpoint requires authentication
// Allowed status updates: 'confirmed', 'cancelled', 'completed'
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Only allow authenticated users (admin/doctor) to update appointment status
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { status, notes } = await request.json();
    
    if (!['confirmed', 'cancelled', 'completed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status update' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    const appointment = await Appointment.findByIdAndUpdate(
      params.id,
      { 
        status,
        ...(notes && { notes }),
        updatedBy: session.user.id
      },
      { new: true }
    );
    
    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    // TODO: Send status update email to patient
    
    return NextResponse.json({ 
      message: 'Appointment updated successfully',
      appointment 
    });
    
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    );
  }
}

// DELETE: Cancel an appointment
// This endpoint requires authentication
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await connectToDatabase();
    
    const appointment = await Appointment.findByIdAndUpdate(
      params.id,
      { 
        status: 'cancelled',
        updatedBy: session.user.id,
        cancelledAt: new Date()
      },
      { new: true }
    );
    
    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    // TODO: Send cancellation email to patient
    
    return NextResponse.json({ 
      message: 'Appointment cancelled successfully',
      appointment 
    });
    
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return NextResponse.json(
      { error: 'Failed to cancel appointment' },
      { status: 500 }
    );
  }
}
