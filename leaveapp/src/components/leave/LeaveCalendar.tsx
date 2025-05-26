"use client";

import { useEffect, useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching leave requests...');
        const response = await fetch("/api/leave/calendar");
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('Error response:', errorData);
          throw new Error(errorData?.message || "Failed to fetch leave calendar");
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        setLeaveRequests(data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch leave calendar";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
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

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-red-600">{error}</div>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
        >
          Retry
        </Button>
      </div>
    );
  }

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
          <Button
            onClick={handlePreviousMonth}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNextMonth}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
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
              className={`min-h-[100px] bg-white p-2 hover:bg-gray-50 transition-colors ${
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
                    className="text-xs p-1 rounded bg-indigo-50 text-indigo-700 truncate hover:bg-indigo-100 transition-colors cursor-pointer"
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