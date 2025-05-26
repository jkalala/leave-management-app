'use client';

import { useState } from "react";
import { Calendar, Clock, Users, Plus } from "lucide-react";
import { LeaveRequestModal } from "@/components/LeaveRequestModal";

export function CalendarClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-x-8">
              <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
              <nav className="hidden md:flex gap-x-6">
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Overview</a>
                <a href="/dashboard/calendar" className="text-blue-600 font-medium">Calendar</a>
                <a href="/dashboard/team" className="text-gray-600 hover:text-gray-900">Team</a>
                <a href="/dashboard/settings" className="text-gray-600 hover:text-gray-900">Settings</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Calendar Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <h2 className="text-lg font-semibold text-gray-900">December 2023</h2>
              <div className="flex items-center gap-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Plus className="h-4 w-4" />
              New Leave Request
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 gap-px bg-gray-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="py-2 text-center text-sm font-semibold text-gray-900">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-px bg-gray-100">
            {Array.from({ length: 35 }).map((_, index) => {
              const day = index + 1;
              const isToday = day === new Date().getDate();
              const hasLeave = [5, 12, 19, 25].includes(day); // Example days with leave

              return (
                <div
                  key={day}
                  className={`min-h-[100px] p-2 bg-white ${
                    isToday ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isToday ? 'font-bold text-blue-600' : 'text-gray-900'}`}>
                      {day}
                    </span>
                    {hasLeave && (
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                        Leave
                      </span>
                    )}
                  </div>
                  {hasLeave && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-500">
                        <div className="flex items-center gap-x-1">
                          <Users className="h-3 w-3" />
                          <span>Team Member</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-x-6">
          <div className="flex items-center gap-x-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Today</span>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="h-3 w-3 rounded-full bg-blue-100"></div>
            <span className="text-sm text-gray-600">Leave Day</span>
          </div>
        </div>
      </main>

      <LeaveRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
} 