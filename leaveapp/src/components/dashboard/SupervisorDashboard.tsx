import { User } from "next-auth";
import { Calendar, Users, FileText } from "lucide-react";
import Link from "next/link";

interface SupervisorDashboardProps {
  user: User;
}

export default function SupervisorDashboard({ user }: SupervisorDashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.firstName}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your team's leave status and pending approvals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Team Leave Requests Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Approvals</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    No pending approvals
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/dashboard/team-requests" className="font-medium text-blue-600 hover:text-blue-500">
                Review requests
              </Link>
            </div>
          </div>
        </div>

        {/* Team Overview Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Team Overview</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    View team members
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/dashboard/team" className="font-medium text-blue-600 hover:text-blue-500">
                Manage team
              </Link>
            </div>
          </div>
        </div>

        {/* Team Calendar Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Team Calendar</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    View team schedule
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/dashboard/calendar" className="font-medium text-blue-600 hover:text-blue-500">
                View calendar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/dashboard/team-requests"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Review Requests
            </Link>
            <Link
              href="/dashboard/team"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Manage Team
            </Link>
            <Link
              href="/dashboard/calendar"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View Calendar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 