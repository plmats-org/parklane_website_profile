"use client";

import LoginScreen from "@/components/backoffice/authentication/loginScreen";
import { useRedirectAuthenticated } from "@/contexts/auth-context";

export default function Login() {
  const { isHydrated, isLoading, isAuthenticated } = useRedirectAuthenticated(
    "/backoffice/dashboard"
  );

  // Show loading while checking auth
  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Don't render login if already authenticated (redirect in progress)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <LoginScreen />
    </div>
  );
}
