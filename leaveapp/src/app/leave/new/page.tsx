import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import NewLeaveRequestForm from "@/components/leave/NewLeaveRequestForm";
import { authOptions } from "@/lib/auth";

export default async function NewLeaveRequestPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              New Leave Request
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Fill in the details below to submit your leave request.</p>
            </div>
            <div className="mt-5">
              <NewLeaveRequestForm userId={session.user.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 