import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient, Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { differenceInDays } from "date-fns";

// Use a singleton pattern for Prisma client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Define role constants
const SUPERVISOR = "SUPERVISOR";
const ADMIN = "ADMIN";

// Define leave type constants
const LEAVE_TYPES = ["ANNUAL", "SICK", "PARENTAL", "COMPASSIONATE", "OTHER"] as const;
type LeaveType = typeof LEAVE_TYPES[number];

// Define leave status constants
const LEAVE_STATUSES = ["PENDING", "APPROVED", "REJECTED", "CANCELLED"] as const;
type LeaveStatus = typeof LEAVE_STATUSES[number];

// Validate leave type
function isValidLeaveType(type: string): type is LeaveType {
  return LEAVE_TYPES.includes(type as LeaveType);
}

export async function POST(req: Request) {
  try {
    console.log('Starting leave request creation...');
    
    // Debug session
    const session = await getServerSession(authOptions);
    console.log('Raw session:', session);
    console.log('Session user:', session?.user);
    console.log('Session user ID:', session?.user?.id);
    console.log('Session expires:', session?.expires);

    if (!session) {
      console.error('No session found');
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    if (!session.user) {
      console.error('No user in session');
      return NextResponse.json({ error: 'No user in session' }, { status: 401 });
    }

    if (!session.user.id) {
      console.error('No user ID in session');
      return NextResponse.json({ error: 'No user ID in session' }, { status: 401 });
    }

    const body = await req.json();
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const { type, startDate, endDate, reason, isUrgent } = body;

    // Validate required fields
    if (!type || !startDate || !endDate) {
      console.error('Missing required fields:', { type, startDate, endDate });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate leave type
    if (!isValidLeaveType(type)) {
      console.error('Invalid leave type:', type);
      return NextResponse.json(
        { error: 'Invalid leave type' },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      console.error('Invalid date range:', { start, end });
      return NextResponse.json(
        { error: 'Start date must be before end date' },
        { status: 400 }
      );
    }

    // Calculate leave duration
    const duration = differenceInDays(end, start) + 1;
    console.log('Leave duration:', duration);

    try {
      // Get user's leave balance
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          leaveRequests: {
            where: {
              type: 'ANNUAL',
              status: 'APPROVED',
              startDate: {
                gte: new Date(new Date().getFullYear(), 0, 1), // Start of current year
              },
            },
          },
        },
      });

      if (!user) {
        console.error('User not found:', session.user.id);
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      console.log('Found user:', { id: user.id, department: user.department });

      // Check leave balance for annual leave
      if (type === 'ANNUAL') {
        const usedLeave = user.leaveRequests.reduce((total, request) => {
          return total + differenceInDays(request.endDate, request.startDate) + 1;
        }, 0);

        const remainingLeave = 20 - usedLeave; // Assuming 20 days annual leave
        console.log('Leave balance:', { usedLeave, remainingLeave, requestedDuration: duration });

        if (duration > remainingLeave) {
          console.error('Insufficient leave balance:', { duration, remainingLeave });
          return NextResponse.json(
            { error: 'Insufficient leave balance' },
            { status: 400 }
          );
        }
      }

      // Check for overlapping leave requests
      const overlappingRequests = await prisma.leaveRequest.findMany({
        where: {
          userId: session.user.id,
          status: {
            notIn: ['REJECTED', 'CANCELLED'],
          },
          OR: [
            {
              AND: [
                { startDate: { lte: start } },
                { endDate: { gte: start } },
              ],
            },
            {
              AND: [
                { startDate: { lte: end } },
                { endDate: { gte: end } },
              ],
            },
          ],
        },
      });

      if (overlappingRequests.length > 0) {
        console.error('Overlapping leave requests found:', overlappingRequests);
        return NextResponse.json(
          { error: 'You have overlapping leave requests' },
          { status: 400 }
        );
      }

      // Determine approval workflow
      let status = 'PENDING';
      let autoApproved = false;
      let supervisorId = null;
      let directorId = null;

      // Auto-approve short leaves (< 3 days) for non-urgent requests
      if (duration <= 3 && !isUrgent) {
        status = 'APPROVED';
        autoApproved = true;
        console.log('Auto-approving short leave request');
      } else {
        // Get supervisor and director IDs based on department
        const supervisor = await prisma.user.findFirst({
          where: {
            department: user.department,
            role: SUPERVISOR as any,
          },
        });

        const director = await prisma.user.findFirst({
          where: {
            role: ADMIN as any,
          },
        });

        supervisorId = supervisor?.id;
        directorId = director?.id;

        console.log('Found approvers:', { supervisorId, directorId });
      }

      // Create leave request
      const leaveRequestData = {
        userId: session.user.id,
        type,
        startDate: start,
        endDate: end,
        reason,
        status,
        supervisorId,
        directorId,
        isUrgent: isUrgent || false,
        autoApproved,
      };

      console.log('Creating leave request with data:', JSON.stringify(leaveRequestData, null, 2));

      const leaveRequest = await prisma.leaveRequest.create({
        data: leaveRequestData as Prisma.LeaveRequestUncheckedCreateInput,
      });

      console.log('Successfully created leave request:', JSON.stringify(leaveRequest, null, 2));
      return NextResponse.json(leaveRequest);
    } catch (prismaError) {
      console.error('Prisma error:', prismaError);
      if (prismaError instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Prisma error code:', prismaError.code);
        console.error('Prisma error message:', prismaError.message);
        return NextResponse.json(
          { 
            error: 'Database error', 
            code: prismaError.code,
            message: prismaError.message 
          },
          { status: 500 }
        );
      }
      throw prismaError;
    }
  } catch (error) {
    console.error('Leave request error:', error);
    return NextResponse.json(
      { 
        error: 'Error creating leave request', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 