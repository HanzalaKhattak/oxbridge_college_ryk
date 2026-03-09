import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { email: true } },
        admissions: { orderBy: { submittedAt: 'desc' }, take: 1 },
      },
    });

    return NextResponse.json({ students });
  } catch (error) {
    console.error('Admin students error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
