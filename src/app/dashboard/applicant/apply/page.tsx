
"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, HelpCircle, ArrowLeft, ArrowRight, Upload, Info } from "lucide-react";
import { getFormClarification } from "@/ai/flows/form-clarification-flow";
import { toast } from "@/hooks/use-toast";

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [clarification, setClarification] = useState<string | null>(null);
  const [isClarifying, setIsClarifying] = useState(false);

  const handleClarify = async (field: string, context: string) => {
    setIsClarifying(true);
    setClarification(null);
    try {
      const result = await getFormClarification({ query: field, context });
      setClarification(result.clarification);
    } catch (error) {
      toast({ title: "Clarification Error", description: "Failed to get AI help.", variant: "destructive" });
    } finally {
      setIsClarifying(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-[#F0F7FF]">
      <Navbar userRole="applicant" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Progress Indicator */}
        <div className="mb-8 flex justify-between items-center px-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= i ? 'bg-primary text-white' : 'bg-white text-muted-foreground border-2 border-muted'}`}>
                {i}
              </div>
              <span className="text-xs font-medium uppercase tracking-tighter text-muted-foreground">
                {i === 1 ? "Basic Info" : i === 2 ? "Business" : i === 3 ? "Documents" : "Review"}
              </span>
            </div>
          ))}
          <div className="absolute left-0 right-0 top-1/2 -z-10 h-1 bg-muted"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-t-8 border-t-primary shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {step === 1 && "Basic Information"}
                  {step === 2 && "Business Details"}
                  {step === 3 && "Document Upload"}
                  {step === 4 && "Final Review"}
                </CardTitle>
                <CardDescription>
                  Please ensure all details match your legal documents for faster approval.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input placeholder="Juan" />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input placeholder="Dela Cruz" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Contact Number</Label>
                      <Input placeholder="+63 9XX XXX XXXX" />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        TIN Number
                        <button 
                          onClick={() => handleClarify("TIN Number", "The Tax Identification Number for the applicant business owner.")}
                          className="text-primary hover:text-accent transition-colors"
                        >
                          <HelpCircle className="h-4 w-4" />
                        </button>
                      </Label>
                      <Input placeholder="XXX-XXX-XXX-XXX" />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Registered Business Name</Label>
                      <Input placeholder="e.g. Juan's Digital Services" />
                    </div>
                    <div className="space-y-2">
                      <Label>Business Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail Trade</SelectItem>
                          <SelectItem value="service">Services / Professional</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        Line of Business
                        <button 
                          onClick={() => handleClarify("Line of Business", "A specific classification of business activity for municipal zoning and fee calculation.")}
                          className="text-primary hover:text-accent transition-colors"
                        >
                          <HelpCircle className="h-4 w-4" />
                        </button>
                      </Label>
                      <Textarea placeholder="Describe your primary business activity..." />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="p-8 border-2 border-dashed rounded-xl flex flex-col items-center gap-4 bg-muted/50">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <div className="text-center">
                        <p className="font-bold">Upload Required Documents</p>
                        <p className="text-sm text-muted-foreground">PDF, JPG or PNG (Max 10MB each)</p>
                      </div>
                      <Button variant="outline">Browse Files</Button>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-bold uppercase text-muted-foreground">Requirements Checklist:</p>
                      {[
                        "Barangay Business Clearance",
                        "DTI / SEC / CDA Registration",
                        "Contract of Lease (if renting)",
                        "Fire Safety Inspection Certificate"
                      ].map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
                          <span className="text-sm">{doc}</span>
                          <Badge variant="secondary" className="text-[10px]">Pending</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 flex gap-3">
                      <Info className="h-5 w-5 text-primary shrink-0" />
                      <p className="text-sm text-primary">
                        By submitting, you declare that all information provided is true and correct under Philippine laws.
                      </p>
                    </div>
                    <div className="divide-y border rounded-lg overflow-hidden">
                       <div className="p-3 flex justify-between text-sm">
                          <span className="text-muted-foreground">Business Name</span>
                          <span className="font-bold">Juan's Sari-Sari Store</span>
                       </div>
                       <div className="p-3 flex justify-between text-sm">
                          <span className="text-muted-foreground">Est. Annual Fee</span>
                          <span className="font-bold">₱2,500.00</span>
                       </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="ghost" onClick={prevStep} disabled={step === 1}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                {step < 4 ? (
                  <Button onClick={nextStep} className="bg-primary px-8">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button className="bg-green-600 hover:bg-green-700 px-8 text-white font-bold" onClick={() => toast({ title: "Application Submitted", description: "Your application is now being processed." })}>
                    Submit Application
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
             <Card className="bg-primary text-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-accent" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                   {isClarifying ? (
                     <div className="flex items-center gap-2 text-sm text-blue-200">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                        Generating clarification...
                     </div>
                   ) : clarification ? (
                     <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-sm leading-relaxed">{clarification}</p>
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/10" onClick={() => setClarification(null)}>
                          Clear Help
                        </Button>
                     </div>
                   ) : (
                     <p className="text-sm text-blue-200">
                       Need help understanding a field? Click the <HelpCircle className="inline h-3 w-3" /> icon next to any field for an AI-powered explanation.
                     </p>
                   )}
                </CardContent>
             </Card>

             <Card className="bg-white border-l-4 border-l-accent">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Helpdesk</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-sm font-bold mb-1">02-8888-0000</p>
                   <p className="text-xs text-muted-foreground">Available Mon-Fri, 8AM - 5PM</p>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
