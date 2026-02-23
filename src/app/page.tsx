
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, FileCheck, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const ownerImg = PlaceHolderImages.find(img => img.id === 'business-owner');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-blue-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <Image 
            src={heroImg?.imageUrl || ""} 
            alt="Background" 
            fill 
            className="object-cover"
            data-ai-hint="city building"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-accent text-primary">
                <Zap className="mr-2 h-4 w-4" />
                Modernizing Philippine Business Licensing
              </div>
              <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
                Secure Your Business Permit <span className="text-accent">Faster Than Ever.</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-xl">
                The official portal for online business permit registration, 
                payment, and tracking. Streamlined for Filipino entrepreneurs 
                by BilisPermit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 w-full sm:w-auto font-bold px-8 py-6 text-lg">
                    Apply Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto px-8 py-6 text-lg">
                    Track Application
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative h-[500px] w-full">
               <div className="absolute top-0 right-0 w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image 
                  src={ownerImg?.imageUrl || ""} 
                  alt="Business Owner" 
                  fill 
                  className="object-cover"
                  data-ai-hint="business person"
                />
               </div>
               <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl border-l-8 border-accent">
                 <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-primary font-bold text-xl leading-none">Verified</p>
                      <p className="text-muted-foreground text-sm">2,450+ Permits Issued</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">Simplify Your Compliance</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our end-to-end digital ecosystem handles everything from document verification to digital permit issuance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Shield, 
                title: "eGov Secure", 
                desc: "Compliant with Philippine Data Privacy and eGov security standards." 
              },
              { 
                icon: Clock, 
                title: "Real-time Tracking", 
                desc: "Monitor your application status anytime, anywhere with live updates." 
              },
              { 
                icon: FileCheck, 
                title: "Digital Permits", 
                desc: "Get your official permit in digital format immediately after approval." 
              }
            ].map((feature, i) => (
              <Card key={i} className="border-none shadow-lg bg-blue-50/50 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-primary rounded-2xl text-white">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-blue-100 py-12 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-accent" />
              <span className="text-2xl font-bold text-white">BilisPermit</span>
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} BilisPermit Portal. An official initiative for Digital Governance.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition-colors">Data Privacy</Link>
              <Link href="#" className="hover:text-accent transition-colors">Terms of Use</Link>
              <Link href="#" className="hover:text-accent transition-colors">Contact Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
