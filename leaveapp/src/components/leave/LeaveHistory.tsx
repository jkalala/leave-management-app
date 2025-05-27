"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason?: string;
  status: string;
  attachments: string[];
  createdAt: string;
  approvals: {
    id: string;
    status: string;
    comments?: string;
    approver: {
      firstName: string;
      lastName: string;
    };
  }[];
}

interface LeaveHistoryProps {
  userId?: string;
}

export default function LeaveHistory({ userId }: LeaveHistoryProps) {
  const { data: session } = useSession();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch("/api/leave");
        if (!response.ok) {
          throw new Error("Failed to fetch leave requests");
        }
        const data = await response.json();
        setLeaveRequests(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch leave requests. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveRequests();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (leaveRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No leave requests found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Dates
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Approvals
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leaveRequests.map((request) => (
            <tr key={request.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {request.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(request.startDate), "MMM d, yyyy")} -{" "}
                {format(new Date(request.endDate), "MMM d, yyyy")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : request.status === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {request.approvals.map((approval) => (
                  <div key={approval.id} className="mb-1">
                    <span className="font-medium">
                      {approval.approver.firstName} {approval.approver.lastName}
                    </span>
                    : {approval.status}
                    {approval.comments && (
                      <span className="text-gray-400"> - {approval.comments}</span>
                    )}
                  </div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(request.createdAt), "MMM d, yyyy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 