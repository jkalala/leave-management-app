'use client';

import { useState } from 'react';
import { Session } from 'next-auth';
import { Calendar, Upload, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns/index.js';

type LeaveType = 'ANNUAL' | 'SICK' | 'PARENTAL' | 'COMPASSIONATE' | 'OTHER';

interface LeaveRequestFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  session: Session | null;
}

export default function LeaveRequestForm({ onSubmit, onCancel, session }: LeaveRequestFormProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [type, setType] = useState<LeaveType>('ANNUAL');
  const [reason, setReason] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (startDate && endDate && startDate > endDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (!type) {
      newErrors.type = 'Leave type is required';
    }
    if (type === 'SICK' && attachments.length === 0) {
      newErrors.attachments = 'Medical certificate is required for sick leave';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formData = {
        startDate,
        endDate,
        type,
        reason,
        isUrgent,
        attachments,
        userId: session?.user?.id
      };
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  className: "mt-1"
                }
              }}
            />
          </LocalizationProvider>
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  className: "mt-1"
                }
              }}
            />
          </LocalizationProvider>
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Leave Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as LeaveType)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="ANNUAL">Annual Leave</option>
          <option value="SICK">Sick Leave</option>
          <option value="PARENTAL">Parental Leave</option>
          <option value="COMPASSIONATE">Compassionate Leave</option>
          <option value="OTHER">Other</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isUrgent}
          onChange={(e) => setIsUrgent(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label className="ml-2 block text-sm text-gray-700">Urgent Request</label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Attachments</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Upload files</span>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setAttachments(Array.from(e.target.files || []))}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
          </div>
        </div>
        {errors.attachments && (
          <p className="mt-1 text-sm text-red-600">{errors.attachments}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </form>
  );
} 