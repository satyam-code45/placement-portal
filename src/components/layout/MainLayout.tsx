import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Logo } from "@/components/ui/logo";

export default function MainLayout() {
    const location = useLocation();

  // show navbar ONLY on landing page
  const showNavbar = location.pathname === "/";

    return (
        <div className="min-h-screen bg-zinc-100/50 font-sans text-foreground selection:bg-black selection:text-white p-6 md:p-10 lg:p-10 relative">

            {/* "Margin Lines" - The crosshairs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden text-zinc-300/80">
                {/* Top Left Crosshair */}
                <div className="absolute top-[24px] md:top-[48px] lg:top-[80px] left-0 w-full h-[1px] border-t border-dashed border-zinc-300/50"></div>
                <div className="absolute top-0 left-[24px] md:left-[48px] lg:left-[80px] h-full w-[1px] border-l border-dashed border-zinc-300/50"></div>

                {/* Top Right Crosshair */}
                <div className="absolute top-[24px] md:top-[48px] lg:top-[80px] right-[24px] md:right-[48px] lg:right-[80px] h-4 w-[1px] bg-zinc-400 hidden lg:block"></div>
                <div className="absolute top-[24px] md:top-[48px] lg:top-[80px] right-[24px] md:right-[48px] lg:right-[80px] w-4 h-[1px] bg-zinc-400 hidden lg:block"></div>

                {/* Bottom Left Crosshair */}
                <div className="absolute bottom-[24px] md:bottom-[48px] lg:bottom-[80px] left-[24px] md:left-[48px] lg:left-[80px] h-4 w-[1px] bg-zinc-400 hidden lg:block"></div>
                <div className="absolute bottom-[24px] md:bottom-[48px] lg:bottom-[80px] left-[24px] md:left-[48px] lg:left-[80px] w-4 h-[1px] bg-zinc-400 hidden lg:block"></div>

                {/* Bottom Right Crosshair */}
                <div className="absolute bottom-[24px] md:bottom-[48px] lg:bottom-[80px] right-0 w-full h-[1px] border-b border-dashed border-zinc-300/50"></div>
                <div className="absolute bottom-0 right-[24px] md:right-[48px] lg:right-[80px] h-full w-[1px] border-r border-dashed border-zinc-300/50"></div>

                {/* Actual Crosshairs at corners of the sheet */}
                <svg className="absolute top-[24px] md:top-[48px] lg:top-[80px] left-[24px] md:left-[48px] lg:left-[80px] -translate-x-1/2 -translate-y-1/2 text-zinc-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
                </svg>
                <svg className="absolute top-[24px] md:top-[48px] lg:top-[80px] right-[24px] md:right-[48px] lg:right-[80px] translate-x-1/2 -translate-y-1/2 text-zinc-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
                </svg>
                <svg className="absolute bottom-[24px] md:bottom-[48px] lg:bottom-[80px] left-[24px] md:left-[48px] lg:left-[80px] -translate-x-1/2 translate-y-1/2 text-zinc-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
                </svg>
                <svg className="absolute bottom-[24px] md:bottom-[48px] lg:bottom-[80px] right-[24px] md:right-[48px] lg:right-[80px] translate-x-1/2 translate-y-1/2 text-zinc-400" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
                </svg>
            </div>

               {showNavbar && <Navbar />}

            {/* Main "Sheet" Container */}
            <div className="mx-auto max-w-[1240px] min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-10rem)] bg-white rounded-[2rem] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-zinc-200/50 flex flex-col relative overflow-clip ">

                {/* Content */}
                <main className="flex-1 flex flex-col">
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className="border-t border-zinc-100 py-6 px-6 md:px-12 bg-white">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                        <div className="flex items-center gap-2 md:gap-4">
                            <Logo className="text-base" />
                            <p className="hidden md:block text-zinc-300 text-sm">|</p>
                            <p className="text-xs text-zinc-500">
                                © 2024 CampusConnect Inc.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs font-medium text-zinc-500">
                            <a href="#" className="hover:text-black transition-colors">About</a>
                            <a href="#" className="hover:text-black transition-colors">Privacy</a>
                            <a href="#" className="hover:text-black transition-colors">Terms</a>
                            <a href="#" className="hover:text-black transition-colors">Status</a>
                            <a href="#" className="hover:text-black transition-colors">Contact</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
