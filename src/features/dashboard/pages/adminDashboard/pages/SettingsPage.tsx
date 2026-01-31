import { useState } from "react";
import {
  Calendar,
  GraduationCap,
  Bell,
  Mail,
  Shield,
  Save,
  RefreshCw,
  Database,
  Globe,
} from "lucide-react";

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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "../components/layout";
import { toast } from "sonner";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    academicYear: "2025-26",
    placementSeason: "summer",
    minCGPA: "6.0",
    maxBacklogs: "0",
    emailNotifications: true,
    smsNotifications: false,
    autoExpireOpportunities: true,
    requireApproval: true,
    allowMultipleOffers: true,
    scraperEnabled: true,
    aiSummarization: true,
    maintenanceMode: false,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Settings & Configuration</h1>
            <p className="text-muted-foreground">
              System-wide settings and preferences
            </p>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Academic Year Settings
                </CardTitle>
                <CardDescription>
                  Configure the current academic year and placement season
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Current Academic Year</Label>
                    <Select
                      value={settings.academicYear}
                      onValueChange={(v) =>
                        setSettings({ ...settings, academicYear: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025-26">2025-26</SelectItem>
                        <SelectItem value="2024-25">2024-25</SelectItem>
                        <SelectItem value="2023-24">2023-24</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Placement Season</Label>
                    <Select
                      value={settings.placementSeason}
                      onValueChange={(v) =>
                        setSettings({ ...settings, placementSeason: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summer">Summer (Apr-Jun)</SelectItem>
                        <SelectItem value="winter">Winter (Sep-Dec)</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Portal Settings
                </CardTitle>
                <CardDescription>
                  Configure portal branding and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>College Name</Label>
                    <Input defaultValue="ABC Institute of Technology" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Email</Label>
                    <Input defaultValue="placements@abcit.edu" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eligibility Settings */}
          <TabsContent value="eligibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Eligibility Criteria
                </CardTitle>
                <CardDescription>
                  Default eligibility rules for placement opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Minimum CGPA Required</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={settings.minCGPA}
                      onChange={(e) =>
                        setSettings({ ...settings, minCGPA: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum Active Backlogs</Label>
                    <Input
                      type="number"
                      value={settings.maxBacklogs}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          maxBacklogs: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Allow Multiple Offers</p>
                    <p className="text-sm text-muted-foreground">
                      Let students hold multiple job offers simultaneously
                    </p>
                  </div>
                  <Switch
                    checked={settings.allowMultipleOffers}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, allowMultipleOffers: v })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how notifications are sent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Send email alerts for new opportunities and updates
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, emailNotifications: v })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Send SMS alerts for urgent updates
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, smsNotifications: v })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feature Toggles */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Feature Toggles
                </CardTitle>
                <CardDescription>
                  Enable or disable system features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Auto-expire Opportunities</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically close opportunities after deadline
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoExpireOpportunities}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, autoExpireOpportunities: v })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Require Approval for Jobs</p>
                    <p className="text-sm text-muted-foreground">
                      Admin must approve before students can see opportunities
                    </p>
                  </div>
                  <Switch
                    checked={settings.requireApproval}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, requireApproval: v })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Web Scraper</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically scrape job listings from career pages
                    </p>
                  </div>
                  <Switch
                    checked={settings.scraperEnabled}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, scraperEnabled: v })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">AI Summarization</p>
                    <p className="text-sm text-muted-foreground">
                      Use AI to summarize job descriptions
                    </p>
                  </div>
                  <Switch
                    checked={settings.aiSummarization}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, aiSummarization: v })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>Advanced data operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-dashed">
                  <div>
                    <p className="font-medium">Export All Data</p>
                    <p className="text-sm text-muted-foreground">
                      Download complete database backup
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("Export started...")}
                  >
                    <Database className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-dashed">
                  <div>
                    <p className="font-medium">Clear Cache</p>
                    <p className="text-sm text-muted-foreground">
                      Clear application cache and reload
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => toast.success("Cache cleared!")}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Clear Cache
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Shield className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Proceed with caution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-red-50">
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Disable portal access for non-admin users
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, maintenanceMode: v })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
