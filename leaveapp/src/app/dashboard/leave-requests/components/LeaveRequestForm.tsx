"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const leaveRequestSchema = z.object({
  type: z.enum(["ANNUAL", "SICK", "PARENTAL", "COMPASSIONATE", "OTHER"]),
  startDate: z.date(),
  endDate: z.date(),
  reason: z.string().min(1, "Reason is required"),
  isUrgent: z.boolean(),
});

type LeaveRequestFormData = z.infer<typeof leaveRequestSchema>;

export function LeaveRequestForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeaveRequestFormData>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      isUrgent: false,
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const onSubmit = async (data: LeaveRequestFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch("/api/leave/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create leave request");
      }

      router.push("/dashboard/leave-requests");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Leave Type</label>
        <select
          {...register("type")}
          className="w-full p-2 border rounded-md"
        >
          <option value="ANNUAL">Annual Leave</option>
          <option value="SICK">Sick Leave</option>
          <option value="PARENTAL">Parental Leave</option>
          <option value="COMPASSIONATE">Compassionate Leave</option>
          <option value="OTHER">Other</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={startDate}
              onChange={(date) => date && setValue("startDate", date)}
              slotProps={{
                textField: {
                  className: "w-full p-2 border rounded-md"
                }
              }}
              minDate={new Date()}
            />
          </LocalizationProvider>
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <DatePicker
            value={endDate}
            onChange={(date) => date && setValue("endDate", date)}
            slotProps={{
              textField: {
                className: "w-full p-2 border rounded-md"
              }
            }}
            minDate={startDate || new Date()}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Reason</label>
        <textarea
          {...register("reason")}
          className="w-full p-2 border rounded-md"
          rows={4}
        />
        {errors.reason && (
          <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register("isUrgent")}
          className="mr-2"
        />
        <label className="text-sm font-medium">This is an urgent request</label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </form>
  );
} 