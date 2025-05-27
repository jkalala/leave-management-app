"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useToast } from "@/components/ui/use-toast";

const leaveRequestSchema = z.object({
  type: z.enum(["ANNUAL", "SICK", "PARENTAL", "COMPASSIONATE", "UNPAID"]),
  startDate: z.date(),
  endDate: z.date(),
  reason: z.string().optional(),
  attachments: z.array(z.string()).optional(),
});

type LeaveRequestFormData = z.infer<typeof leaveRequestSchema>;

interface NewLeaveRequestFormProps {
  userId: string;
}

export default function NewLeaveRequestForm({ userId }: NewLeaveRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeaveRequestFormData>({
    resolver: zodResolver(leaveRequestSchema),
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const onSubmit = async (data: LeaveRequestFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit leave request");
      }

      toast({
        title: "Success",
        description: "Your leave request has been submitted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit leave request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Leave Type
          </label>
          <select
            id="type"
            {...register("type")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="ANNUAL">Annual Leave</option>
            <option value="SICK">Sick Leave</option>
            <option value="PARENTAL">Parental Leave</option>
            <option value="COMPASSIONATE">Compassionate Leave</option>
            <option value="UNPAID">Unpaid Leave</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <DatePicker
              value={startDate}
              onChange={(date) => setValue("startDate", date as Date)}
              minDate={new Date()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  className: "mt-1",
                },
              }}
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <DatePicker
              value={endDate}
              onChange={(date) => setValue("endDate", date as Date)}
              minDate={startDate || new Date()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  className: "mt-1",
                },
              }}
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700"
          >
            Reason (Optional)
          </label>
          <textarea
            id="reason"
            {...register("reason")}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.reason && (
            <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="attachments"
            className="block text-sm font-medium text-gray-700"
          >
            Attachments (Optional)
          </label>
          <input
            type="file"
            id="attachments"
            multiple
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setValue(
                "attachments",
                files.map((file) => file.name)
              );
            }}
          />
          {errors.attachments && (
            <p className="mt-1 text-sm text-red-600">
              {errors.attachments.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </LocalizationProvider>
  );
} 