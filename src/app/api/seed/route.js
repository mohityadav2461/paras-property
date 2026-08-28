import { NextResponse } from 'next/server';
import { initStorage } from '@/lib/storage';

export async function POST() {
  try {
    await initStorage();
    return NextResponse.json({ success: true, message: 'Database initialized with demo data' });
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}
