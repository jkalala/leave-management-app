import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import LeaveCalendar from "./LeaveCalendar";

export default async function LeaveCalendarWrapper() {
  const session = await getServerSession(authOptions);
  return <LeaveCalendar userId={session?.user?.id} />;
} 