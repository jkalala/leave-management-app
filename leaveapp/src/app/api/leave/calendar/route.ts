import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    console.log('Calendar API: Starting request');
    const session = await getServerSession(authOptions);
    console.log('Calendar API: Session', session);

    if (!session?.user?.email) {
      console.log('Calendar API: No session or email found');
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    console.log('Calendar API: Found user', user);

    if (!user) {
      console.log('Calendar API: User not found');
      return new NextResponse("User not found", { status: 404 });
    }

    // Get all approved leave requests for the user's department
    const leaveRequests = await prisma.leaveRequest.findMany({
      where: {
        status: "APPROVED",
        user: {
          department: user.department,
        },
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            department: true,
          },
        },
      },
      orderBy: {
        startDate: "asc",
      },
    });
    console.log('Calendar API: Found leave requests', leaveRequests);

    return NextResponse.json(leaveRequests);
  } catch (error) {
    console.error("[LEAVE_CALENDAR_GET] Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' }), 
      { status: 500 }
    );
  }
} 