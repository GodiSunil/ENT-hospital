import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Service from '@/lib/models/Service';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');

    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    } else {
      query.isActive = true; // Default to active services only
    }

    const services = await Service.find(query).sort({ order: 1, name: 1 });

    return NextResponse.json({
      success: true,
      services
    });

  } catch (error) {
    console.error('Services fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'category', 'description', 'detailedDescription', 'image', 'icon'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate category
    const validCategories = ['ear', 'nose', 'throat', 'pediatric', 'hearing', 'voice', 'allergy'];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const service = new Service(body);
    await service.save();

    return NextResponse.json({
      success: true,
      service
    }, { status: 201 });

  } catch (error) {
    console.error('Service creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}