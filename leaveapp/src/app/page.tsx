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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to Leave Management System</h1>
    </main>
  );
}
