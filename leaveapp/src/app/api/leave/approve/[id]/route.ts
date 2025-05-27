import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await request.json();
    if (!status || !['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Get the leave request
    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id: params.id },
      include: { user: true },
    });

    if (!leaveRequest) {
      return NextResponse.json(
        { error: 'Leave request not found' },
        { status: 404 }
      );
    }

    // Get the approver's user record
    const approver = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!approver) {
      return NextResponse.json(
        { error: 'Approver not found' },
        { status: 404 }
      );
    }

    // Check if the approver is in the same department
    if (approver.department !== leaveRequest.user.department) {
      return NextResponse.json(
        { error: 'You can only approve requests from your department' },
        { status: 403 }
      );
    }

    // Update the leave request status
    const updatedRequest = await prisma.leaveRequest.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error('Error approving leave request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 