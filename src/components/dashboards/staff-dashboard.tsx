
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, CheckCircle2, XCircle, MoreVertical } from "lucide-react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { generatePersonalizedNotification } from "@/ai/flows/personalized-notifications-flow";
import { toast } from "@/hooks/use-toast";

export function StaffDashboard() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleNotify = async (app: any) => {
    setLoadingId(app.id);
    try {
      const result = await generatePersonalizedNotification({
        applicantName: "Juan Dela Cruz",
        applicationId: app.id,
        status: app.status,
        statusDetails: "Your application is currently being reviewed by the Municipal Planning office.",
        requirements: ["Latest Lease Contract", "Updated Fire Safety Certificate"],
        complexInfo: "Your fee calculation is based on the gross sales reported in your 2022 income tax returns."
      });
      
      toast({
        title: "Notification Sent",
        description: "AI-personalized SMS and Email sent to applicant.",
      });
      console.log("AI Message:", result.notificationMessage);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate notification.",
        variant: "destructive"
      });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Permit Review Queue</h1>
          <p className="text-muted-foreground">Municipal Staff Portal • {MOCK_APPLICATIONS.length} Pending Actions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">New Applications</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-700">45</div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">In Progress</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-700">128</div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Approved Today</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-700">3</div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Flagged / Urgent</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center gap-4 w-full max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, ID or business..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_APPLICATIONS.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium text-primary">{app.id}</TableCell>
                  <TableCell>Juan Dela Cruz</TableCell>
                  <TableCell>{app.businessName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.submittedDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleNotify(app)} disabled={loadingId === app.id}>
                        {loadingId === app.id ? "..." : "AI Notify"}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-primary">
                        Review
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
