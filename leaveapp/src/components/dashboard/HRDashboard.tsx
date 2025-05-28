import { User } from "next-auth";
import { Users, FileText, BarChart } from "lucide-react";
import Link from "next/link";

interface HRDashboardProps {
  user: User;
}

export default function HRDashboard({ user }: HRDashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.firstName}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of leave requests and employee management.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* All Leave Requests Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">All Leave Requests</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    View all requests
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/dashboard/all-requests" className="font-medium text-blue-600 hover:text-blue-500">
                Manage requests
              </Link>
            </div>
          </div>
        </div>

        {/* Employee Management Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Employee Management</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    Manage employees
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/dashboard/employees" className="font-medium text-blue-600 hover:text-blue-500">
                View employees
              </Link>
            </div>
          </div>
        </div>

        {/* Reports Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Reports</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    Generate reports
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/dashboard/reports" className="font-medium text-blue-600 hover:text-blue-500">
                View reports
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
              href="/dashboard/all-requests"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Manage Requests
            </Link>
            <Link
              href="/dashboard/employees"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Manage Employees
            </Link>
            <Link
              href="/dashboard/reports"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Generate Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 