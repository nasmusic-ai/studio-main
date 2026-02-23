
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Users, ShieldAlert, BarChart3, Database } from "lucide-react";

export function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">System Administration</h1>
          <p className="text-muted-foreground">Manage portal security, users, and global configurations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Users, label: "User Management", color: "bg-blue-100 text-blue-700" },
          { icon: ShieldAlert, label: "Security Logs", color: "bg-red-100 text-red-700" },
          { icon: BarChart3, label: "System Analytics", color: "bg-green-100 text-green-700" },
          { icon: Database, label: "Database Backups", color: "bg-yellow-100 text-yellow-700" },
        ].map((item, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6 flex flex-col items-center gap-4">
              <div className={`p-4 rounded-2xl ${item.color}`}>
                <item.icon className="h-8 w-8" />
              </div>
              <p className="font-bold text-primary">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5" />
              Portal Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground">Suspend new applications during updates</p>
              </div>
              <Button size="sm" variant="outline">Disabled</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">2FA Enforcement</p>
                <p className="text-xs text-muted-foreground">Require two-factor for all staff roles</p>
              </div>
              <Button size="sm" variant="outline" className="bg-primary text-white hover:bg-primary/90">Active</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                   <span>Server Load</span>
                   <span className="text-green-600 font-bold">Excellent</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                   <div className="bg-green-500 h-2 w-[15%] rounded-full"></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span>Storage Used (45.2 TB)</span>
                   <span>38%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                   <div className="bg-blue-500 h-2 w-[38%] rounded-full"></div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
