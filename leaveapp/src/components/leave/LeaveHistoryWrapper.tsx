import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import LeaveHistory from "./LeaveHistory";

export default async function LeaveHistoryWrapper() {
  const session = await getServerSession(authOptions);
  return <LeaveHistory userId={session?.user?.id} />;
} 