import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Briefcase, GraduationCap, CheckCircle, Search, MapPin, Clock, DollarSign } from "lucide-react";

export function HeroSection() {
    return (
        <section className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-center pt-24 pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto min-h-[80vh]">
            {/* Left: Content */}
            <div className="flex flex-col items-start text-left space-y-6 max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50/50 px-3 py-1 text-sm text-zinc-600 font-medium hover:border-zinc-300 transition-colors cursor-default">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                    #1 Placement Automation Platform
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-[4rem] font-bold tracking-tight text-zinc-900 leading-[1] text-balance">
                    Streamline your <br /> campus drives.
                </h1>

                <p className="text-lg text-zinc-500 font-normal leading-relaxed max-w-lg">
                    The all-in-one operating system for university placements. Connect students, companies, and placement cells in one unified workflow.
                </p>

                <div className="flex flex-col w-full max-w-md gap-3 pt-2">
                    <Button
                        size="lg"
                        className="h-12 text-[15px] font-medium w-full bg-zinc-900 hover:bg-black text-white justify-start pl-4 relative shadow-lg shadow-zinc-200/50 group rounded-full"
                        asChild
                    >
                        <Link to="/login" state={{ role: "student" }} className="flex items-center">
                            <div className="bg-white/10 p-1.5 rounded-full mr-3">
                                <GraduationCap className="h-4 w-4" />
                            </div>
                            Student Login
                            <ChevronRight className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="h-12 text-[15px] font-medium w-full bg-zinc-50 hover:bg-zinc-100 text-zinc-900 border border-zinc-200 justify-start pl-4 group rounded-full"
                        asChild
                    >
                        <Link to="/company/login" className="flex items-center">
                            <div className="bg-zinc-200 p-1.5 rounded-full mr-3">
                                <Briefcase className="h-4 w-4 text-zinc-600" />
                            </div>
                            Company Login
                            <ChevronRight className="ml-auto h-4 w-4 text-zinc-400 group-hover:text-zinc-600" />
                        </Link>
                    </Button>
                    <div className="flex items-center gap-4 pl-2 pt-1">
                        <span className="text-xs text-zinc-400 flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> Zero setup fee</span>
                        <span className="text-xs text-zinc-400 flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> GDPR Compliant</span>
                    </div>
                </div>
            </div>

            {/* Right: Job Board Visual */}
            <div className="relative w-full max-w-[500px] lg:max-w-none mx-auto aspect-square md:aspect-[4/3] lg:aspect-square bg-zinc-50/50 rounded-3xl border border-zinc-200/50 p-6 flex flex-col items-center justify-center overflow-hidden">

                {/* Abstract Background Elements */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>

                {/* Main Job Card */}
                <div className="relative w-full bg-white rounded-2xl border border-zinc-200 shadow-xl shadow-zinc-200/40 p-5 space-y-4 z-20">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                A
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-900">Product Designer</h3>
                                <p className="text-xs text-zinc-500">Acme Corp • San Francisco</p>
                            </div>
                        </div>
                        <div className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                            New
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <span className="px-2 py-1 bg-zinc-50 border border-zinc-100 rounded-md text-xs text-zinc-600 font-medium flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Full-time
                        </span>
                        <span className="px-2 py-1 bg-zinc-50 border border-zinc-100 rounded-md text-xs text-zinc-600 font-medium flex items-center gap-1">
                            <DollarSign className="h-3 w-3" /> 120k-150k
                        </span>
                        <span className="px-2 py-1 bg-zinc-50 border border-zinc-100 rounded-md text-xs text-zinc-600 font-medium flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> Remote
                        </span>
                    </div>

                    <div className="pt-2">
                        <Button size="sm" className="w-full bg-zinc-900 hover:bg-black text-white h-9 text-xs rounded-lg font-medium">
                            Apply Now
                        </Button>
                    </div>
                </div>

                {/* Floating Background Card 1 (Bottom) */}
                <div className="absolute bottom-12 scale-[0.9] opacity-60 translate-y-12 w-[90%] bg-white rounded-2xl border border-zinc-200 p-4 z-10">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                            G
                        </div>
                        <div className="flex-1">
                            <div className="h-2 w-24 bg-zinc-200 rounded mb-2"></div>
                            <div className="h-2 w-16 bg-zinc-100 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Floating Background Card 2 (Top - Search) */}
                <div className="absolute top-12 -right-8 w-48 bg-white rounded-xl border border-zinc-200 p-3 shadow-lg z-30 transform rotate-6">
                    <div className="flex items-center gap-2 text-zinc-400 mb-2">
                        <Search className="h-3 w-3" />
                        <span className="text-xs">Software Engineer...</span>
                    </div>
                    <div className="h-1 bg-zinc-100 rounded-full w-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-2/3"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
