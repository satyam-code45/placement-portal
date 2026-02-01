import { Brain, Video, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppLayout } from "../component/layout";

export default function MockInterviewPage() {
const handleStartInterview = () => {
  window.open("http://localhost:3000/dashboard", "_self");
};


  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold">AI Mock Interview</h1>
          <p className="text-muted-foreground mt-1">
            Practice with AI-powered mock interviews and improve your skills
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-2">
          <CardHeader className="space-y-4 text-center pb-4">
            <div className="mx-auto w-fit rounded-full bg-primary/10 p-4">
              <Brain className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl">Get Interview Ready</CardTitle>
              <CardDescription className="text-base">
                Practice with our AI-powered interview platform and boost your
                confidence
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Features */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">AI-Powered Questions</h3>
                  <p className="text-sm text-muted-foreground">
                    Get realistic interview questions tailored to your field
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Video Practice</h3>
                  <p className="text-sm text-muted-foreground">
                    Practice with video recording and review your performance
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Instant Feedback</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive detailed feedback on your answers and delivery
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Track Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your improvement over time with analytics
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                className="w-full md:w-auto px-8"
                onClick={handleStartInterview}
              >
                <Brain className="mr-2 h-5 w-5" />
                Start Mock Interview
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info Card */}
        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Pro Tip</h3>
                <p className="text-sm text-muted-foreground">
                  Practice regularly to build confidence. The more you practice,
                  the better you'll perform in real interviews. Try to simulate
                  real interview conditions by dressing professionally and
                  choosing a quiet space.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
