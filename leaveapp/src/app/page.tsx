'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Calendar, Clock, Users, Building, BookOpen, ArrowRight, CheckCircle2, BarChart3, Shield, Zap, Star } from "lucide-react";
import { NavigationButtons } from "@/components/NavigationButtons";
import { HeroImage } from "@/components/HeroImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[600px] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-white">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-blue-100 text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 1000+ Companies
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Modern Leave Management for Modern Teams
              </h1>
              <p className="text-xl text-blue-100">
                Streamline your leave management process with our intuitive platform. Save time, reduce errors, and keep your team happy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {session ? (
                  <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                    <Link href="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                      <Link href="/sign-in">
                        Sign In
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <Link href="/sign-up">Create Account</Link>
                    </Button>
                  </>
                )}
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/documentation" className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Documentation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-800/50 to-transparent"></div>
              <HeroImage />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50%</div>
              <p className="text-gray-600">Time Saved on Leave Management</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything you need to manage leave
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features to streamline your leave management process
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy Leave Requests
              </h3>
              <p className="text-gray-600">
                Submit and track leave requests with just a few clicks. Get instant updates on your request status.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Real-time Updates
              </h3>
              <p className="text-gray-600">
                Stay informed with real-time notifications and updates on your leave requests and approvals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Team Calendar
              </h3>
              <p className="text-gray-600">
                View your team's leave schedule and plan accordingly with our intuitive calendar interface.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Advanced Features for Modern Teams
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Automated Approvals</h3>
                    <p className="text-gray-600">Set up approval workflows that match your company's policies</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Leave Balance Tracking</h3>
                    <p className="text-gray-600">Automatically track and update leave balances</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Custom Leave Types</h3>
                    <p className="text-gray-600">Configure different types of leave according to your needs</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <BarChart3 className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">Track leave patterns and trends</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <Shield className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900">Security</h3>
                <p className="text-sm text-gray-600">Enterprise-grade security</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <Zap className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900">Fast</h3>
                <p className="text-sm text-gray-600">Lightning-fast performance</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <Users className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900">Team Sync</h3>
                <p className="text-sm text-gray-600">Seamless team collaboration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Loved by teams worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See what our customers have to say about us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-gray-600 mb-4">
                "This platform has transformed how we manage leave requests. It's intuitive, efficient, and has saved us countless hours."
              </p>
              <div className="font-semibold text-gray-900">Sarah Johnson</div>
              <div className="text-sm text-gray-500">HR Manager, TechCorp</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-gray-600 mb-4">
                "The team calendar feature is a game-changer. We can now plan our resources better and avoid scheduling conflicts."
              </p>
              <div className="font-semibold text-gray-900">Michael Chen</div>
              <div className="text-sm text-gray-500">Team Lead, InnovateCo</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-gray-600 mb-4">
                "The automated approval system has streamlined our workflow significantly. Highly recommended!"
              </p>
              <div className="font-semibold text-gray-900">Emily Rodriguez</div>
              <div className="text-sm text-gray-500">Operations Director, GlobalTech</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of companies using our leave management system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!session && (
                <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  <Link href="/sign-up">Create Account</Link>
                </Button>
              )}
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/documentation">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
