import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Fetch all counts in parallel
    const [
      totalStudents,
      activeStudents,
      totalStaff,
      totalAdmissions,
      pendingAdmissions,
      totalFeeRecords,
      paidFeeRecords,
      pendingFeeRecords,
      totalAnnouncements,
      recentStudents,
      recentAdmissions,
      recentFeeRecords,
      announcements,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.student.count({ where: { status: 'ACTIVE' } }),
      prisma.staff.count(),
      prisma.admission.count(),
      prisma.admission.count({ where: { status: 'PENDING' } }),
      prisma.feeRecord.count(),
      prisma.feeRecord.count({ where: { status: 'PAID' } }),
      prisma.feeRecord.count({ where: { status: 'PENDING' } }),
      prisma.announcement.count({ where: { isActive: true } }),
      prisma.student.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { user: { select: { email: true } } },
      }),
      prisma.admission.findMany({
        orderBy: { submittedAt: 'desc' },
        take: 5,
        include: { student: { select: { name: true, studentId: true } } },
      }),
      prisma.feeRecord.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { student: { select: { name: true, studentId: true } } },
      }),
      prisma.announcement.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    // Fee revenue
    const paidFees = await prisma.feeRecord.aggregate({
      where: { status: 'PAID' },
      _sum: { amount: true },
    });

    const pendingFees = await prisma.feeRecord.aggregate({
      where: { status: 'PENDING' },
      _sum: { amount: true },
    });

    return NextResponse.json({
      admin: {
        email: decoded.email,
        role: decoded.role,
      },
      stats: {
        totalStudents,
        activeStudents,
        totalStaff,
        totalAdmissions,
        pendingAdmissions,
        totalFeeRecords,
        paidFeeRecords,
        pendingFeeRecords,
        totalAnnouncements,
        totalRevenue: paidFees._sum.amount || 0,
        pendingRevenue: pendingFees._sum.amount || 0,
      },
      recentStudents,
      recentAdmissions,
      recentFeeRecords,
      announcements,
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
