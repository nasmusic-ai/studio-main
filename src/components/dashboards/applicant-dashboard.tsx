
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, FileText, Clock, CreditCard, ChevronRight, CheckCircle2, Download } from "lucide-react";
import Link from "next/link";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";

export function ApplicantDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending Review': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Payment Required': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Declined': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Welcome, Juan Dela Cruz</h1>
          <p className="text-muted-foreground">Manage your business permit applications and certifications.</p>
        </div>
        <Link href="/dashboard/applicant/apply">
          <Button className="bg-primary hover:bg-primary/90 h-12 px-6">
            <PlusCircle className="mr-2 h-5 w-5" />
            New Application
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-primary text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-wider">Active Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Issued Permits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">0</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          My Applications
        </h2>
        
        <div className="grid gap-4">
          {MOCK_APPLICATIONS.map((app) => (
            <Card key={app.id} className="overflow-hidden hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-primary">{app.businessName}</h3>
                      <p className="text-sm text-muted-foreground">{app.id} • {app.businessType}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Application Progress</span>
                      <span>{app.status === 'Approved' ? '100%' : '65%'}</span>
                    </div>
                    <Progress value={app.status === 'Approved' ? 100 : 65} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Submitted: {app.submittedDate}
                    </div>
                    {app.feeAmount && (
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        Fee: ₱{app.feeAmount.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-blue-50/50 p-6 flex flex-col justify-center items-center gap-2 min-w-[200px] border-l md:border-l border-t md:border-t-0">
                  {app.status === 'Payment Required' ? (
                    <Button className="w-full bg-accent text-primary hover:bg-accent/90 font-bold">
                      Pay Now
                    </Button>
                  ) : app.status === 'Approved' ? (
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                      <Download className="mr-2 h-4 w-4" />
                      Digital Permit
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full">
                      View Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
