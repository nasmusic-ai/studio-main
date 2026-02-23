"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { ApplicantDashboard } from "@/components/dashboards/applicant-dashboard";
import { StaffDashboard } from "@/components/dashboards/staff-dashboard";
import { TreasurerDashboard } from "@/components/dashboards/treasurer-dashboard";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";
import { Role } from "@/lib/mock-data";

function DashboardContent() {
  const searchParams = useSearchParams();
  const role = (searchParams.get("role") || "applicant") as Role;

  const renderDashboard = () => {
    switch (role) {
      case "applicant":
        return <ApplicantDashboard />;
      case "staff":
        return <StaffDashboard />;
      case "treasurer":
        return <TreasurerDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <ApplicantDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-col">
      <Navbar userRole={role} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboard()}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}