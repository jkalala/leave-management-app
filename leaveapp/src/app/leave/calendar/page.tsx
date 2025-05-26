import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LeaveCalendar from "@/components/leave/LeaveCalendar";

export default async function LeaveCalendarPage() {
  const session = await auth();

  if (!session?.userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Leave Calendar
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>View team leave calendar and plan accordingly.</p>
            </div>
            <div className="mt-5">
              <LeaveCalendar userId={session.userId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 