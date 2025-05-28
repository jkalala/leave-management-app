'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
  user: {
    firstName: string;
    lastName: string;
    department: string;
  };
}

function ApprovalsClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pendingRequests, setPendingRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleApproval = async (requestId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const response = await fetch(`/api/leave/approve/${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update request status');
      }

      // Remove the approved/rejected request from the list
      setPendingRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign-in');
      return;
    }

    if (status === 'loading') {
      return;
    }

    const fetchPendingRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/leave/pending-approvals');
        if (!response.ok) {
          throw new Error('Failed to fetch pending requests');
        }
        const data = await response.json();
        setPendingRequests(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Pending Approvals</h1>
        {pendingRequests.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">No pending requests to approve</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {request.user.firstName} {request.user.lastName}
                    </h2>
                    <p className="text-sm text-gray-600">Department: {request.user.department}</p>
                    <p className="text-sm text-gray-600">Type: {request.type}</p>
                    <p className="text-sm text-gray-600">
                      Dates: {new Date(request.startDate).toLocaleDateString()} -{' '}
                      {new Date(request.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleApproval(request.id, 'APPROVED')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(request.id, 'REJECTED')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApprovalsClient; 