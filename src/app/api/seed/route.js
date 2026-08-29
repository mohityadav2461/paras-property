import { NextResponse } from 'next/server';
import { initStorage } from '@/lib/storage';
import { getSession } from '@/lib/auth';

export async function POST(request) {
  try {
    const session = await getSession(request);
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await initStorage();
    return NextResponse.json({ success: true, message: 'Database initialized with demo data' });
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}
