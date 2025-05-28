import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard";
import SupervisorDashboard from "@/components/dashboard/SupervisorDashboard";
import HRDashboard from "@/components/dashboard/HRDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "EMPLOYEE" | "SUPERVISOR" | "HR" | "ADMIN";
  department: string;
  leaveBalance: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <>
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="Leave Management Dashboard" />
        </Head>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </>
    );
  }

  if (status === "unauthenticated") {
    router.push("/sign-in");
    return null;
  }

  const user = session?.user as SessionUser;
  const roleComponents = {
    EMPLOYEE: EmployeeDashboard,
    SUPERVISOR: SupervisorDashboard,
    HR: HRDashboard,
    ADMIN: AdminDashboard,
  };

  const DashboardComponent = roleComponents[user.role] || EmployeeDashboard;

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Leave Management Dashboard" />
      </Head>
      <DashboardComponent user={user} />
    </>
  );
} 