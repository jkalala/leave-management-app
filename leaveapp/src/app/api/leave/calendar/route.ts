import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
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

    return NextResponse.json(leaveRequests);
  } catch (error) {
    console.error("[LEAVE_CALENDAR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 