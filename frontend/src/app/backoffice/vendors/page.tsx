"use client";

import { Suspense } from "react";
import VendorsScreen from "@/components/backoffice/VendorsScreen";

function VendorsPageLoader() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
  );
}

export default function VendorsPage() {
  return (
    <Suspense fallback={<VendorsPageLoader />}>
      <div className="min-h-screen">
        <VendorsScreen />
      </div>
    </Suspense>
  );
}
