'use client'

import { ArrowLeft, Calendar, Clock, Building, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600">
            Learn how to use our leave management system effectively
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Create an Account</h3>
                <p className="mt-2 text-gray-600">
                  Sign up for a new account using your email address. You'll need to provide your full name and create a password.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Access Your Dashboard</h3>
                <p className="mt-2 text-gray-600">
                  After signing in, you'll be taken to your dashboard where you can view your leave balance and recent requests.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Submit Leave Requests</h3>
                <p className="mt-2 text-gray-600">
                  Use the "New Request" button to submit leave requests. Select your leave type, dates, and provide a reason.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-900">Leave Requests</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">Submit new leave requests with start and end dates</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">View request status and approval history</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">Cancel or modify pending requests</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-900">Leave Balance</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">Track your remaining leave days</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">View leave history and usage patterns</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">Monitor upcoming leave periods</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-900">Team Calendar</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">View team members' leave schedules</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">Plan team coverage during absences</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">Export calendar data for reporting</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="ml-4 text-xl font-semibold text-gray-900">Reports & Analytics</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">Generate leave reports by department</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">Track leave trends and patterns</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600">Export data for HR analysis</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-yellow-500 mr-4 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Submit Requests Early</h3>
                <p className="mt-2 text-gray-600">
                  Submit your leave requests at least 2 weeks in advance to ensure proper processing and team coverage.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-yellow-500 mr-4 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Check Team Calendar</h3>
                <p className="mt-2 text-gray-600">
                  Always check the team calendar before submitting requests to avoid scheduling conflicts.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-yellow-500 mr-4 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Monitor Your Balance</h3>
                <p className="mt-2 text-gray-600">
                  Regularly check your leave balance to ensure you have enough days for planned time off.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/sign-up">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 