import {  Share2, Shield, Globe, Layers, Zap, Languages, Layout } from "lucide-react";

const features = [
    { icon: Shield, title: "Data Privacy First", description: "GDPR compliant student data." },
    { icon: Video, title: "Video Interviews", description: "Built-in conferencing." },
    { icon: Share2, title: "Instant Sharing", description: "Share profiles with one click." },
    { icon: Layers, title: "LMS Integration", description: "Connect with Canvas or Moodle." },
    { icon: Globe, title: "Remote Friendly", description: "Hybrid drives made easy." },
    { icon: Languages, title: "Resume Parsing", description: "Support for 65+ formats." },
    { icon: Layout, title: "Custom Branding", description: "Your university logo & colors." },
    { icon: Zap, title: "Real-time Stats", description: "Live placement analytics." }
];

import { Video } from "lucide-react";

export function FeatureBento() {
    return (
        <section className="py-20 px-6 max-w-[1240px] mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-16">...and so much more!</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {features.map((feature, idx) => (
                    <div key={idx} className="group bg-white rounded-3xl p-6 border border-zinc-200/60 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300 flex flex-col items-center justify-center aspect-square md:aspect-[4/3] lg:aspect-square">
                        <div className="h-14 w-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <feature.icon className="h-6 w-6 text-zinc-700" />
                        </div>
                        <h3 className="font-bold text-zinc-900 text-sm md:text-base leading-tight">{feature.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
