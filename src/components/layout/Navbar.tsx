import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-start justify-center p-4 pt-4 md:pt-2">
            <div
                className={`
            flex flex-col transition-all duration-300 backdrop-blur-xl border bg-white/70 shadow-lg border-white/20 rounded-[2rem] px-6
            ${isOpen ? "w-full max-w-sm py-6 gap-6 rounded-[2rem]" : "w-full max-w-2xl py-3 items-center justify-between flex-row"}
        `}
            >
                <div className="flex items-center justify-between w-full">
                    <Logo className="text-lg" />

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <nav className="flex items-center gap-6 mr-4">
                            <Link to="/jobs" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">
                                Jobs
                            </Link>
                            <Link to="/companies" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">
                                Companies
                            </Link>
                            <Link to="/resources" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">
                                Resources
                            </Link>
                        </nav>
                        <Link to="/login" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors px-4">
                            Sign in
                        </Link>
                        <Button size="sm" asChild className="rounded-full px-6 font-semibold bg-zinc-900 hover:bg-black text-[15px] shadow-md transition-all">
                            <Link to="/signup">Get started</Link>
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden p-2 -mr-2 text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile Menu Content */}
                {isOpen && (
                    <div className="flex flex-col gap-4 md:hidden w-full animate-in slide-in-from-top-4 fade-in duration-200">
                        <nav className="flex flex-col gap-2">
                            <Link
                                to="/jobs"
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-medium text-zinc-600 hover:text-black hover:bg-zinc-100/50 p-2 rounded-lg transition-colors"
                            >
                                Jobs
                            </Link>
                            <Link
                                to="/companies"
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-medium text-zinc-600 hover:text-black hover:bg-zinc-100/50 p-2 rounded-lg transition-colors"
                            >
                                Companies
                            </Link>
                            <Link
                                to="/resources"
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-medium text-zinc-600 hover:text-black hover:bg-zinc-100/50 p-2 rounded-lg transition-colors"
                            >
                                Resources
                            </Link>
                        </nav>
                        <div className="h-px bg-zinc-200/50 w-full my-2"></div>
                        <div className="flex flex-col gap-3">
                            <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm font-medium text-center text-zinc-600 hover:text-black p-2 transition-colors">
                                Sign in
                            </Link>
                            <Button size="lg" asChild className="w-full rounded-full font-semibold bg-zinc-900 hover:bg-black text-[15px] shadow-md">
                                <Link to="/signup" onClick={() => setIsOpen(false)}>
                                    Get started
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
