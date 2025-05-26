'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LeaveRequestForm from '@/components/LeaveRequestForm';

export default function NewLeaveRequestPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/leave/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit leave request');
      }

      // Redirect to leave requests list on success
      router.push('/dashboard/leave');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">New Leave Request</h1>
        <p className="mt-2 text-sm text-gray-600">
          Fill out the form below to submit your leave request.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg bg-white p-6 shadow">
        <LeaveRequestForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
} 