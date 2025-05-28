'use client';

import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Calendar, Clock, Users, Plus, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { XIcon } from "@heroicons/react/solid";

const leaveRequestSchema = z.object({
  type: z.enum(["annual", "sick", "unpaid"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  reason: z.string().optional(),
});

type LeaveRequestFormData = z.infer<typeof leaveRequestSchema>;

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeaveRequestModal({ isOpen, onClose }: LeaveRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [teamLeaves, setTeamLeaves] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [leaveType, setLeaveType] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<LeaveRequestFormData>({
    resolver: zodResolver(leaveRequestSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: LeaveRequestFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Upload attachments first
      const uploadedUrls = await Promise.all(
        attachments.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const { url } = await response.json();
          return url;
        })
      );

      // Submit leave request
      const response = await fetch("/api/leave/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          attachments: uploadedUrls,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const result = await response.json();
      setTeamLeaves(result.teamLeaves);
      
      if (result.message.includes("auto-approved")) {
        onClose();
        reset();
        setAttachments([]);
        // TODO: Show success toast
      } else {
        // Show team availability warning
        setError("Team members on leave during this period:");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit leave request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      New Leave Request
                    </Dialog.Title>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                      <div>
                        <label htmlFor="leave-type" className="block text-sm font-medium leading-6 text-gray-900">
                          Leave Type
                        </label>
                        <select
                          id="leave-type"
                          name="leave-type"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={leaveType}
                          onChange={(e) => setLeaveType(e.target.value)}
                          required
                        >
                          <option value="">Select a type</option>
                          <option value="annual">Annual Leave</option>
                          <option value="sick">Sick Leave</option>
                          <option value="unpaid">Unpaid Leave</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                            Start Date
                          </label>
                          <div className="relative mt-2">
                            <input
                              type="date"
                              id="start-date"
                              name="start-date"
                              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
                              onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
                            End Date
                          </label>
                          <div className="relative mt-2">
                            <input
                              type="date"
                              id="end-date"
                              name="end-date"
                              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
                              onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                          Reason
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="reason"
                            name="reason"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Attachments
                        </label>
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                              >
                                <span>Upload files</span>
                                <input
                                  id="file-upload"
                                  type="file"
                                  multiple
                                  className="sr-only"
                                  onChange={handleFileChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PDF, DOC, DOCX up to 10MB
                            </p>
                          </div>
                        </div>
                        {attachments.length > 0 && (
                          <ul className="mt-2 divide-y divide-gray-200">
                            {attachments.map((file, index) => (
                              <li
                                key={index}
                                className="flex items-center justify-between py-2"
                              >
                                <span className="text-sm text-gray-500">
                                  {file.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeAttachment(index)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {error && (
                        <div className="rounded-md bg-red-50 p-4">
                          <div className="flex">
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-red-800">
                                {error}
                              </h3>
                              {teamLeaves.length > 0 && (
                                <ul className="mt-2 list-disc list-inside text-sm text-red-700">
                                  {teamLeaves.map((leave, index) => (
                                    <li key={index}>
                                      {leave.user.firstName} {leave.user.lastName} (
                                      {format(new Date(leave.startDate), "MMM d")} -{" "}
                                      {format(new Date(leave.endDate), "MMM d")})
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        >
                          Submit Request
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 