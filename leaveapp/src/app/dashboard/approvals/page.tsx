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

export default function ApprovalsPage() {
  const { data: session } = useSession();
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
    if (!session) {
      router.push('/sign-in');
      return;
    }

    const fetchPendingRequests = async () => {
      try {
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
  }, [session, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Approvals</h1>
      {pendingRequests.length === 0 ? (
        <p>No pending requests to approve</p>
      ) : (
        <div className="grid gap-4">
          {pendingRequests.map((request) => (
            <div key={request.id} className="border p-4 rounded-lg">
              <h2 className="font-semibold">
                {request.user.firstName} {request.user.lastName}
              </h2>
              <p>Department: {request.user.department}</p>
              <p>Type: {request.type}</p>
              <p>
                Dates: {new Date(request.startDate).toLocaleDateString()} -{' '}
                {new Date(request.endDate).toLocaleDateString()}
              </p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleApproval(request.id, 'APPROVED')}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(request.id, 'REJECTED')}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 