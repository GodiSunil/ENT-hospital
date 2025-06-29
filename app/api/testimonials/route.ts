import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const isActive = searchParams.get('isActive');
    const limit = searchParams.get('limit');

    let query: any = {};
    
    if (featured !== null) {
      query.featured = featured === 'true';
    }
    
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    } else {
      query.isActive = true; // Default to active testimonials only
    }

    let testimonialQuery = Testimonial.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      testimonialQuery = testimonialQuery.limit(parseInt(limit));
    }

    const testimonials = await testimonialQuery;

    return NextResponse.json({
      success: true,
      testimonials
    });

  } catch (error) {
    console.error('Testimonials fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['patientName', 'rating', 'review', 'treatment', 'doctorName'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate rating
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const testimonial = new Testimonial(body);
    await testimonial.save();

    return NextResponse.json({
      success: true,
      testimonial
    }, { status: 201 });

  } catch (error) {
    console.error('Testimonial creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}