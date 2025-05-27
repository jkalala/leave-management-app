import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LeaveHistory from "@/components/leave/LeaveHistory";

export default async function LeaveHistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Leave History
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>View your past leave requests and their status.</p>
            </div>
            <div className="mt-5">
              <LeaveHistory userId={session.user.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 