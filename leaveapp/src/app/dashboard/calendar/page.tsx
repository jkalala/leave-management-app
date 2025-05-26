'use client';

import { useSession } from "next-auth/react";
import LeaveCalendar from "@/components/leave/LeaveCalendar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CalendarPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session?.user?.id) {
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Leave Calendar</h1>
      <LeaveCalendar userId={session.user.id} />
    </div>
  );
} 