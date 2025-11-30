import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Shield } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-secondary/50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center items-center gap-3 mb-6">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Krav Manager</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>New Student Registration</CardTitle>
            <CardDescription>
              Welcome! Please fill out the form below to begin your training journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" placeholder="000.000.000-00" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(00) 00000-0000" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency-name">Contact Name</Label>
                    <Input id="emergency-name" placeholder="Name of contact" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-phone">Contact Phone</Label>
                    <Input id="emergency-phone" placeholder="Contact's phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-relationship">Relationship</Label>
                    <Input id="emergency-relationship" placeholder="e.g., Father, Spouse" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Clothing Sizes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shirt-size">Shirt Size</Label>
                    <Select>
                      <SelectTrigger id="shirt-size">
                        <SelectValue placeholder="Select a size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="s">Small (S)</SelectItem>
                        <SelectItem value="m">Medium (M)</SelectItem>
                        <SelectItem value="l">Large (L)</SelectItem>
                        <SelectItem value="xl">Extra Large (XL)</SelectItem>
                        <SelectItem value="xxl">XXL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pants-size">Pants Size (Numeric)</Label>
                    <Input id="pants-size" type="number" placeholder="e.g., 42" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <Button type="submit">Submit Registration</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
