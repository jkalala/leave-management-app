'use client';

import { ReactNode } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "EMPLOYEE" | "SUPERVISOR" | "HR" | "ADMIN";
  department: string;
  leaveBalance: number;
}

interface DashboardLayoutProps {
  children: ReactNode;
  user: SessionUser;
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader user={user} />
      <div className="flex">
        <DashboardSidebar user={user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
} 