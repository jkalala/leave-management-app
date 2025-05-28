import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

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

  const user = session?.user as any;
  if (user?.role !== "ADMIN") {
    router.push("/dashboard");
    return null;
  }

  return (
    <>
      <Head>
        <title>System Settings</title>
        <meta name="description" content="System settings and configuration" />
      </Head>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure system-wide settings and preferences.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form className="space-y-6">
              {/* Leave Request Settings */}
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Leave Request Settings</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="auto-approve"
                        name="auto-approve"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="auto-approve" className="font-medium text-gray-700">
                        Auto-approve leave requests
                      </label>
                      <p className="text-gray-500">
                        Automatically approve leave requests that don't require manager approval
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notify-manager"
                        name="notify-manager"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notify-manager" className="font-medium text-gray-700">
                        Notify managers
                      </label>
                      <p className="text-gray-500">
                        Send email notifications to managers for new leave requests
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Settings */}
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">System Settings</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="default-leave-days" className="block text-sm font-medium text-gray-700">
                      Default Annual Leave Days
                    </label>
                    <input
                      type="number"
                      name="default-leave-days"
                      id="default-leave-days"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="20"
                    />
                  </div>

                  <div>
                    <label htmlFor="fiscal-year-start" className="block text-sm font-medium text-gray-700">
                      Fiscal Year Start
                    </label>
                    <input
                      type="date"
                      name="fiscal-year-start"
                      id="fiscal-year-start"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 