"use client";

import { Suspense } from "react";
import ResetPasswordScreen from "@/components/backoffice/authentication/resetPassword";
import { useRedirectAuthenticated } from "@/contexts/auth-context";

function ResetPasswordLoader() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
  );
}

function ResetPasswordContent() {
  const { isHydrated, isLoading, isAuthenticated } = useRedirectAuthenticated(
    "/backoffice/dashboard"
  );

  // Show loading while checking auth
  if (!isHydrated || isLoading) {
    return <ResetPasswordLoader />;
  }

  // Don't render if already authenticated (redirect in progress)
  if (isAuthenticated) {
    return <ResetPasswordLoader />;
  }

  return (
    <div className="min-h-screen">
      <ResetPasswordScreen />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoader />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
