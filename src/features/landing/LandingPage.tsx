import { HeroSection } from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { TrustedBy } from "./components/TrustedBy";
import { CoreFeatures } from "./components/CoreFeatures";
import { FeatureBento } from "./components/FeatureBento";
import { CTASection } from "./components/CTASection";

export default function LandingPage() {
    return (
        <div className="flex flex-col w-full h-full">
            <HeroSection />

            {/* "How it works" Label */}
            <div className="flex justify-center -mb-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm text-sm font-semibold text-zinc-700">
                    <span className="text-lg">✨</span> How it works
                </div>
            </div>

            <HowItWorks />

            <CoreFeatures />

            <FeatureBento />

            <TrustedBy />
            
            <CTASection />

        </div>
    );
}
