"use client";

import { LeaveRequestForm } from "../components/LeaveRequestForm";

export function NewLeaveRequest() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">New Leave Request</h1>
      <LeaveRequestForm />
    </div>
  );
} 