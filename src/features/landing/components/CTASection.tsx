import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Star, Trophy } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-6 px-2 w-full max-w-[1000px] mx-auto">
      <div className="relative bg-gradient-to-br from-[#c49a1b]/5 to-[#8b6914]/5 rounded-3xl border border-[#c49a1b]/20 shadow-sm overflow-hidden text-center mx-auto w-full py-10 md:py-12">
        {/* Abstract Background Grid - Subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#c49a1b08_1px,transparent_1px),linear-gradient(to_bottom,#c49a1b08_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)]"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 gap-8">
          <div className="text-left max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-tight mb-3">
              Smarter, simpler placements.
            </h2>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
              Join 500+ universities automating their campus recruitment.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="h-10 px-6 rounded-full bg-yellow-600 hover:bg-[#a88417] text-white font-medium text-sm shadow-md shadow-[#c49a1b]/30"
                asChild
              >
                <Link to="/signup" className="flex items-center">
                  Get started <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-10 px-6 rounded-full border-[#c49a1b]/30 bg-white hover:bg-yellow-600/10 text-[#8b6914] font-medium text-sm"
                asChild
              >
                <Link to="/contact">Talk to sales</Link>
              </Button>
            </div>

            {/* Mini Badges Row */}
            <div className="flex items-center gap-4 opacity-80 scale-90 origin-right">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400 gap-0.5">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                </div>
                <span className="font-bold text-zinc-900 text-[10px]">
                  G2 High Performer
                </span>
              </div>
              <div className="h-3 w-[1px] bg-zinc-200"></div>
              <div className="flex items-center gap-1.5">
                <Trophy className="h-3 w-3 text-zinc-400" />
                <span className="font-bold text-zinc-900 text-[10px]">
                  #1 Education App
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
