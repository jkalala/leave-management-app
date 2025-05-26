import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient, Prisma } from '@prisma/client';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

// Define role constants
const SUPERVISOR = 'SUPERVISOR' as const;
const ADMIN = 'ADMIN' as const;

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action } = await req.json();
    const requestId = params.id;

    if (!['APPROVE', 'REJECT'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    // Get the leave request
    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: {
            department: true,
          },
        },
      },
    });

    if (!leaveRequest) {
      return NextResponse.json(
        { error: 'Leave request not found' },
        { status: 404 }
      );
    }

    // Get the approver's role
    const approver = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, department: true },
    });

    if (!approver) {
      return NextResponse.json(
        { error: 'Approver not found' },
        { status: 404 }
      );
    }

    // Check if the approver has permission
    if ((approver.role as string) === 'SUPERVISOR') {
      if (approver.department !== leaveRequest.user.department) {
        return NextResponse.json(
          { error: 'Not authorized to approve this request' },
          { status: 403 }
        );
      }

      // Update the request status based on supervisor's action
      await prisma.leaveRequest.update({
        where: { id: requestId },
        data: {
          status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
          supervisorId: session.user.id,
        } as Prisma.LeaveRequestUncheckedUpdateInput,
      });
    } else if ((approver.role as string) === 'ADMIN') {
      if (leaveRequest.status !== 'APPROVED') {
        return NextResponse.json(
          { error: 'Request must be approved by supervisor first' },
          { status: 400 }
        );
      }

      // Update the request status based on director's action
      await prisma.leaveRequest.update({
        where: { id: requestId },
        data: {
          status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
          directorId: session.user.id,
        } as Prisma.LeaveRequestUncheckedUpdateInput,
      });
    } else {
      return NextResponse.json(
        { error: 'Unauthorized role' },
        { status: 403 }
      );
    }

    // TODO: Send notifications to the employee about the status change

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing approval:', error);
    return NextResponse.json(
      { error: 'Error processing approval' },
      { status: 500 }
    );
  }
} 