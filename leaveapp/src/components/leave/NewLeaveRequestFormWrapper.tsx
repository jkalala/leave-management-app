import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import NewLeaveRequestForm from "./NewLeaveRequestForm";

export default async function NewLeaveRequestFormWrapper() {
  const session = await getServerSession(authOptions);
  return <NewLeaveRequestForm userId={session?.user?.id} />;
} 