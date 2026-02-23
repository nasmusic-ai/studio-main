
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Shield, Menu, User as UserIcon, LogOut } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Navbar({ userRole }: { userRole?: string }) {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-primary tracking-tight">BilisPermit</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {userRole ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className={pathname.includes('/dashboard') ? "bg-accent/20" : ""}>Dashboard</Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <UserIcon className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem>Help Center</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link href="/">
                      <DropdownMenuItem className="text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-primary hover:bg-primary/90">Register</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
