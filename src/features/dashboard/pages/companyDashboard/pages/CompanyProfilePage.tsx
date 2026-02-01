import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Mail, Phone, Globe, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CompanyProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your company information and branding
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Company Logo */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Company Logo</CardTitle>
            <CardDescription>Update your company logo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center">
                <Building2 className="h-16 w-16 text-gray-400" />
              </div>
              <Button variant="outline" size="sm">
                Upload Logo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name *</Label>
                <Input id="company-name" placeholder="Acme Corporation" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Input id="industry" placeholder="Technology" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-size">Company Size</Label>
                <Input id="company-size" placeholder="100-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="founded-year">Founded Year</Label>
                <Input id="founded-year" type="number" placeholder="2010" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your company..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input id="phone" placeholder="+91 1234567890" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input id="website" placeholder="https://company.com" />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="Complete office address..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>
              Add your company's social media profiles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/company/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" placeholder="https://twitter.com/..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" placeholder="https://facebook.com/..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" placeholder="https://instagram.com/..." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="md:col-span-3 flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
