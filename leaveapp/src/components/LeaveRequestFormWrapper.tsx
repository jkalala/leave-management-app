import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import LeaveRequestForm from "./LeaveRequestForm";

interface LeaveRequestFormWrapperProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default async function LeaveRequestFormWrapper({ onSubmit, onCancel }: LeaveRequestFormWrapperProps) {
  const session = await getServerSession(authOptions);
  return <LeaveRequestForm onSubmit={onSubmit} onCancel={onCancel} session={session} />;
} 