import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Set priority based on inquiry type
    const priorityMap: { [key: string]: string } = {
      'emergency': 'urgent',
      'appointment': 'high',
      'insurance': 'normal',
      'general': 'normal',
      'feedback': 'low'
    };

    const contact = new Contact({
      ...body,
      priority: priorityMap[body.inquiryType] || 'normal'
    });

    await contact.save();

    return NextResponse.json({
      success: true,
      contact,
      message: 'Your message has been sent successfully. We will contact you soon.'
    }, { status: 201 });

  } catch (error) {
    console.error('Contact creation error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const inquiryType = searchParams.get('inquiryType');

    let query: any = {};
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (inquiryType) query.inquiryType = inquiryType;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      contacts
    });

  } catch (error) {
    console.error('Contacts fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}