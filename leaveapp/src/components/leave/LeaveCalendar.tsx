"use client";

import { useEffect, useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";

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
  userId?: string;
}

export default function LeaveCalendar({ userId }: LeaveCalendarProps) {
  const { data: session } = useSession();
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
        const response = await fetch("/api/leave/calendar");
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || "Failed to fetch leave calendar");
        }
        
        const data = await response.json();
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
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-900"
          >
            {day}
          </div>
        ))}

        {days.map((day) => {
          const leaveRequests = getLeaveRequestsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toString()}
              className={`bg-white p-2 min-h-[100px] ${
                !isCurrentMonth ? 'text-gray-400' : ''
              }`}
            >
              <div
                className={`text-sm font-medium ${
                  isCurrentDay ? 'bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center' : ''
                }`}
              >
                {format(day, 'd')}
              </div>
              {leaveRequests.length > 0 && (
                <div className="mt-1 space-y-1">
                  {leaveRequests.map((request) => (
                    <div
                      key={request.id}
                      className="text-xs p-1 rounded bg-blue-50 text-blue-700 truncate"
                      title={`${request.user.firstName} ${request.user.lastName} - ${request.type}`}
                    >
                      {request.user.firstName} {request.user.lastName} - {request.type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 