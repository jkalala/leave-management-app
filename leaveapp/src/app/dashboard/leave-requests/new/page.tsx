import { Metadata } from "next";
import { NewLeaveRequest } from "./NewLeaveRequest";

export const metadata: Metadata = {
  title: "New Leave Request",
  description: "Create a new leave request",
};

export default function NewLeaveRequestPage() {
  return <NewLeaveRequest />;
} 