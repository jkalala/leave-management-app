import { useSession } from "next-auth/react";
import LeaveCalendar from "@/components/leave/LeaveCalendar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

export default function CalendarPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <>
        <Head>
          <title>Leave Calendar</title>
          <meta name="description" content="View and manage leave calendar" />
        </Head>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </>
    );
  }

  if (!session?.user?.id) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Leave Calendar</title>
        <meta name="description" content="View and manage leave calendar" />
      </Head>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Leave Calendar</h1>
        <LeaveCalendar userId={session.user.id} />
        <Toaster />
      </div>
    </>
  );
} 