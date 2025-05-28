import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

export default function DocumentationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/sign-in");
    return null;
  }

  return (
    <>
      <Head>
        <title>Documentation - Leave Management System</title>
        <meta name="description" content="Documentation for the Leave Management System" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
            <p className="mt-2 text-sm text-gray-500">
              Learn how to use the Leave Management System effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Employee Guide */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Employee Guide</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Requesting Leave</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Learn how to submit and manage your leave requests.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                    <li>Submit a new leave request</li>
                    <li>View request status</li>
                    <li>Cancel or modify requests</li>
                    <li>Check leave balance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Calendar</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    View team leave calendar and plan accordingly.
                  </p>
                </div>
              </div>
            </div>

            {/* Manager Guide */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Manager Guide</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Approving Requests</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage and approve team leave requests.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                    <li>Review pending requests</li>
                    <li>Approve or reject requests</li>
                    <li>Add comments to requests</li>
                    <li>View team calendar</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Team Management</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage team members and their leave balances.
                  </p>
                </div>
              </div>
            </div>

            {/* HR Guide */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">HR Guide</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Employee Management</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage employee leave policies and balances.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                    <li>Add new employees</li>
                    <li>Set leave policies</li>
                    <li>Manage leave balances</li>
                    <li>Generate reports</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Admin Guide */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Guide</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Configure system-wide settings and preferences.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                    <li>Configure leave policies</li>
                    <li>Manage user roles</li>
                    <li>System preferences</li>
                    <li>Email notifications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/leave-requests"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Leave Requests
              </Link>
              <Link
                href="/dashboard/calendar"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Calendar
              </Link>
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 