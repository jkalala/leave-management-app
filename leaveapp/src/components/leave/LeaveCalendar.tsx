"use client";

import { useEffect, useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  user: {
    firstName: string;
    lastName: string;
    department: string;
  };
}

interface LeaveCalendarProps {
  userId: string;
}

export default function LeaveCalendar({ userId }: LeaveCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch("/api/leave/calendar");
        if (!response.ok) {
          throw new Error("Failed to fetch leave calendar");
        }
        const data = await response.json();
        setLeaveRequests(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch leave calendar. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveRequests();
  }, [toast, currentDate]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getLeaveRequestsForDay = (date: Date) => {
    return leaveRequests.filter((request) => {
      const startDate = new Date(request.startDate);
      const endDate = new Date(request.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() =>
              setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
            }
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
            }
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-700"
          >
            {day}
          </div>
        ))}

        {days.map((day) => {
          const leaveRequestsForDay = getLeaveRequestsForDay(day);
          return (
            <div
              key={day.toString()}
              className={`min-h-[100px] bg-white p-2 ${
                !isSameMonth(day, currentDate) ? "bg-gray-50" : ""
              } ${isToday(day) ? "ring-2 ring-indigo-500" : ""}`}
            >
              <div className="text-sm text-gray-500 mb-1">
                {format(day, "d")}
              </div>
              <div className="space-y-1">
                {leaveRequestsForDay.map((request) => (
                  <div
                    key={request.id}
                    className="text-xs p-1 rounded bg-indigo-50 text-indigo-700 truncate"
                    title={`${request.user.firstName} ${request.user.lastName} - ${request.type}`}
                  >
                    {request.user.firstName} {request.user.lastName} - {request.type}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 