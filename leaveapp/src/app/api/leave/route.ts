import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient, Prisma } from "@prisma/client";
import { z } from "zod";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// Define role constants
const SUPERVISOR = "SUPERVISOR" as const;
const ADMIN = "ADMIN" as const;

const leaveRequestSchema = z.object({
  type: z.enum(["ANNUAL", "SICK", "PARENTAL", "COMPASSIONATE", "OTHER"]),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  reason: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  userId: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const validatedData = leaveRequestSchema.parse(body);

    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        department: true,
        role: true,
        leaveRequests: {
          where: {
            type: "ANNUAL",
            status: "APPROVED",
            startDate: {
              gte: new Date(new Date().getFullYear(), 0, 1)
            }
          }
        }
      }
    });

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Check if user has enough leave balance for annual leave
    if (validatedData.type === "ANNUAL") {
      const daysRequested = Math.ceil(
        (validatedData.endDate.getTime() - validatedData.startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const usedLeave = dbUser.leaveRequests.reduce((total, request) => {
        return total + Math.ceil(
          (request.endDate.getTime() - request.startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );
      }, 0);

      const remainingLeave = 20 - usedLeave; // Assuming 20 days annual leave

      if (daysRequested > remainingLeave) {
        return new NextResponse("Insufficient leave balance", { status: 400 });
      }
    }

    // Create leave request
    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        type: validatedData.type,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        reason: validatedData.reason || "",
        attachments: validatedData.attachments || [],
        userId: dbUser.id,
        status: "PENDING",
      } as Prisma.LeaveRequestUncheckedCreateInput,
    });

    // Find a supervisor in the same department
    const supervisor = await prisma.user.findFirst({
      where: {
        department: dbUser.department,
        role: "SUPERVISOR" as Prisma.UserWhereInput["role"]
      }
    });

    if (supervisor) {
      // Create initial approval for supervisor
      await prisma.leaveRequest.update({
        where: { id: leaveRequest.id },
        data: {
          approverId: supervisor.id
        } as Prisma.LeaveRequestUncheckedUpdateInput,
      });
    }

    return NextResponse.json(leaveRequest);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }

    console.error("[LEAVE_REQUEST_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true
      }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const leaveRequests = await prisma.leaveRequest.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        approver: true,
        supervisor: true,
        director: true,
        comments: true,
      } as unknown as Prisma.LeaveRequestInclude,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(leaveRequests);
  } catch (error) {
    console.error("[LEAVE_REQUEST_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 