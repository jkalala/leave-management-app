'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface NavigationButtonsProps {
  variant?: 'primary' | 'secondary' | 'dark';
  className?: string;
}

export function NavigationButtons({ variant = 'primary', className = '' }: NavigationButtonsProps) {
  const router = useRouter();

  const getButtonStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          primary: "bg-white text-blue-600 hover:bg-blue-50 border border-blue-100 shadow-sm hover:shadow",
          secondary: "text-blue-600 hover:text-blue-700"
        };
      case 'dark':
        return {
          primary: "bg-white text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow",
          secondary: "text-white hover:text-blue-100"
        };
      default:
        return {
          primary: "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-sm hover:shadow",
          secondary: "text-gray-900 hover:text-blue-600"
        };
    }
  };

  const styles = getButtonStyles();

  return (
    <div className={`flex items-center gap-x-8 ${className}`}>
      <button
        onClick={() => router.push('/sign-up')}
        type="button"
        className={`group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 ${styles.primary}`}
      >
        <span className="relative z-10">Get Started</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
      </button>
      <button
        onClick={() => router.push('/sign-in')}
        type="button"
        className={`group inline-flex items-center text-sm font-semibold transition-colors duration-200 ${styles.secondary}`}
      >
        <span className="relative z-10">Sign In</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
      </button>
    </div>
  );
} 