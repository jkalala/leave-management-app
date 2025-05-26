import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "../components/DashboardLayout";

interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "EMPLOYEE" | "SUPERVISOR" | "HR" | "ADMIN";
  department: string;
  leaveBalance: number;
}

export default async function LeaveRequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user as SessionUser;
  return <DashboardLayout user={user}>{children}</DashboardLayout>;
} 