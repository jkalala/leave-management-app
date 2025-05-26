import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import EmployeeDashboard from "./components/EmployeeDashboard"
import SupervisorDashboard from "./components/SupervisorDashboard"
import HRDashboard from "./components/HRDashboard"
import AdminDashboard from "./components/AdminDashboard"

interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "EMPLOYEE" | "SUPERVISOR" | "HR" | "ADMIN";
  department: string;
  leaveBalance: number;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/sign-in")
  }

  const user = session.user as SessionUser;
  const roleComponents = {
    EMPLOYEE: EmployeeDashboard,
    SUPERVISOR: SupervisorDashboard,
    HR: HRDashboard,
    ADMIN: AdminDashboard,
  }

  const DashboardComponent = roleComponents[user.role] || EmployeeDashboard

  return <DashboardComponent user={user} />
} 