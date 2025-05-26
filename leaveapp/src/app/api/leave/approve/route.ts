import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { leaveRequestId, status, comment } = await req.json();

    // Get the leave request with user details
    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id: leaveRequestId },
      include: {
        user: true,
      },
    });

    if (!leaveRequest) {
      return NextResponse.json(
        { error: "Leave request not found" },
        { status: 404 }
      );
    }

    // Get the approver's details
    const approver = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!approver) {
      return NextResponse.json(
        { error: "Approver not found" },
        { status: 404 }
      );
    }

    // Check if approver is in the same department or is HR/Admin
    if (
      approver.role === ("SUPERVISOR" as any) && approver.department !== leaveRequest.user.department
    ) {
      return NextResponse.json(
        { error: "You can only approve leave requests from your department" },
        { status: 403 }
      );
    }

    // Update leave request status
    const updatedLeaveRequest = await prisma.leaveRequest.update({
      where: { id: leaveRequestId },
      data: {
        status: status,
        approverId: approver.id
      } as Prisma.LeaveRequestUncheckedUpdateInput,
    });

    // Add comment if provided
    if (comment) {
      await prisma.$queryRaw`
        INSERT INTO "Comment" (id, content, "createdAt", "leaveRequestId", "userId")
        VALUES (gen_random_uuid(), ${comment}, NOW(), ${leaveRequestId}, ${approver.id})
      `;
    }

    // If approved, update user's leave balance
    if (status === "APPROVED") {
      const daysRequested = Math.ceil(
        (leaveRequest.endDate.getTime() - leaveRequest.startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      await prisma.user.update({
        where: { id: leaveRequest.userId },
        data: {
          leaveBalance: {
            decrement: daysRequested
          }
        } as Prisma.UserUncheckedUpdateInput,
      });
    }

    return NextResponse.json(updatedLeaveRequest);
  } catch (error) {
    console.error("Error approving leave request:", error);
    return NextResponse.json(
      { error: "Failed to approve leave request" },
      { status: 500 }
    );
  }
} 