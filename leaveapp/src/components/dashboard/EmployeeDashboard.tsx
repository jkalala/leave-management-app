import { User } from "next-auth";
import { Calendar, Clock, FileText } from "lucide-react";
import Link from "next/link";

interface EmployeeDashboardProps {
  user: User;
}

export default function EmployeeDashboard({ user }: EmployeeDashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.firstName}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your leave status and recent activities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Leave Balance Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Leave Balance</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {(user as any).leaveBalance || 0} days remaining
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/dashboard/leave-requests" className="font-medium text-blue-600 hover:text-blue-500">
                Request leave
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Requests Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Recent Requests</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    No recent requests
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/dashboard/leave-requests" className="font-medium text-blue-600 hover:text-blue-500">
                View all requests
              </Link>
            </div>
          </div>
        </div>

        {/* Calendar Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Leave</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    No upcoming leave
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
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/dashboard/leave-requests"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Request Leave
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