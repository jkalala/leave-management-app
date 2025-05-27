'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Calendar, Upload, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns/AdapterDateFns";

type LeaveType = 'ANNUAL' | 'SICK' | 'PARENTAL' | 'COMPASSIONATE' | 'OTHER';

interface LeaveRequestFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function LeaveRequestForm({ onSubmit, onCancel }: LeaveRequestFormProps) {
  const { data: session } = useSession();
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
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload attachments if any
      const uploadedUrls = await Promise.all(
        attachments.map(async (file) => {
          // TODO: Implement file upload
          return URL.createObjectURL(file);
        })
      );

      const formData = {
        type,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        reason,
        isUrgent,
        attachments: uploadedUrls,
      };

      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setErrors({ submit: 'Error submitting leave request' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Leave Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Leave Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as LeaveType)}
          className={`mt-1 block w-full rounded-lg border ${
            errors.type ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
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

      {/* Date Range */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <div className="relative mt-1">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={startDate}
                onChange={(date) => date && setStartDate(date)}
                slotProps={{
                  textField: {
                    className: "w-full p-2 border rounded-md"
                  }
                }}
                minDate={new Date()}
              />
            </LocalizationProvider>
          </div>
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <div className="relative mt-1">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={endDate}
                onChange={(date) => date && setEndDate(date)}
                slotProps={{
                  textField: {
                    className: "w-full p-2 border rounded-md"
                  }
                }}
                minDate={startDate || new Date()}
              />
            </LocalizationProvider>
          </div>
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
          )}
        </div>
      </div>

      {/* Reason */}
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Reason
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Please provide a reason for your leave request..."
        />
      </div>

      {/* Attachments */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Attachments
        </label>
        <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-4">
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
                  name="file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              {type === 'SICK' ? 'Medical certificate required' : 'Optional attachments'}
            </p>
          </div>
        </div>
        {attachments.length > 0 && (
          <ul className="mt-2 divide-y divide-gray-200 rounded-lg border border-gray-200">
            {attachments.map((file, index) => (
              <li key={index} className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-500">{file.name}</span>
                <button
                  type="button"
                  onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                  className="text-sm text-red-600 hover:text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors.attachments && (
          <p className="mt-1 text-sm text-red-600">{errors.attachments}</p>
        )}
      </div>

      {/* Urgent Request */}
      <div className="flex items-center">
        <input
          id="urgent"
          type="checkbox"
          checked={isUrgent}
          onChange={(e) => setIsUrgent(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="urgent" className="ml-2 block text-sm text-gray-900">
          Mark as urgent request
        </label>
      </div>

      {/* Error Message */}
      {errors.submit && (
        <div className="rounded-lg bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{errors.submit}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </form>
  );
} 