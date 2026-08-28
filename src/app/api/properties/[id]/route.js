import { NextResponse } from 'next/server';
import { getPropertyBySlugOrId, updateProperty, deleteProperty } from '@/lib/storage';
import { getSession } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const property = await getPropertyBySlugOrId(id);

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const updated = await updateProperty(id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, property: updated });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to update property' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await deleteProperty(id);
    return NextResponse.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete property' },
      { status: 500 }
    );
  }
}
