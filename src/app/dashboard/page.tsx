import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { ApplicantDashboard } from "@/components/dashboards/applicant-dashboard";
import { StaffDashboard } from "@/components/dashboards/staff-dashboard";
import { TreasurerDashboard } from "@/components/dashboards/treasurer-dashboard";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";

interface TokenPayload {
  userId: string;
  role: "applicant" | "staff" | "treasurer" | "admin";
}

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  let decoded: TokenPayload;

  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;
  } catch (error) {
    redirect("/auth/login");
  }

  const renderDashboard = () => {
    switch (decoded.role) {
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
      <Navbar userRole={decoded.role} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboard()}
      </main>
    </div>
  );
}