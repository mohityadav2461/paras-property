import { NextResponse } from 'next/server';
import { getProperties, getAllPropertiesAdmin, createProperty } from '@/lib/storage';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';

    if (isAdmin) {
      const session = await getSession(request);
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const allProps = await getAllPropertiesAdmin();
      return NextResponse.json(allProps);
    }

    const filters = {
      status: searchParams.get('status') || undefined,
      location: searchParams.get('location') || undefined,
      propertyType: searchParams.get('propertyType') || undefined,
      minPrice: searchParams.get('minPrice') || undefined,
      maxPrice: searchParams.get('maxPrice') || undefined,
      minSize: searchParams.get('minSize') || undefined,
      maxSize: searchParams.get('maxSize') || undefined,
      search: searchParams.get('search') || undefined,
      sort: searchParams.get('sort') || 'newest',
    };

    const properties = await getProperties(filters);
    return NextResponse.json(properties);
  } catch (error) {
    console.error('API /api/properties GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title || !body.price || !body.size || !body.location) {
      return NextResponse.json(
        { error: 'Title, price, size, and location are required' },
        { status: 400 }
      );
    }

    const created = await createProperty(body);
    return NextResponse.json({ success: true, property: created }, { status: 201 });
  } catch (error) {
    console.error('API /api/properties POST error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create property' },
      { status: 500 }
    );
  }
}
