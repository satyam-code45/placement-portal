import { Globe, GraduationCap, User, Video } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="py-24 bg-zinc-50 border-y border-zinc-100/50">
      <div className="text-center mb-20 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
          With us, placement tracking is easy.
        </h2>
        <p className="text-xl text-zinc-500">
          Effortless scheduling for students and recruiters.
        </p>
      </div>

      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8">
        {/* Card 01: Connect Profile */}
        <div className="bg-white p-8 rounded-[2rem] border border-zinc-200/80 shadow-sm flex flex-col h-[500px] relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="h-8 w-8 bg-zinc-100 rounded-md flex items-center justify-center text-xs font-bold text-zinc-500 mb-6 font-mono">
            01
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-3">
            Connect your profile
          </h3>
          <p className="text-zinc-500 leading-relaxed mb-8">
            We'll handle all the cross-referencing, so you don't have to worry
            about updating resumes everywhere.
          </p>

          <div className="absolute bottom-0 left-0 right-0 h-64 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border border-zinc-100 flex items-center justify-center animate-[spin_10s_linear_infinite]">
              <div className="absolute -top-3 bg-white p-1 rounded-lg border shadow-sm">
                <Globe className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="absolute w-48 h-48 rounded-full border border-zinc-200 flex items-center justify-center animate-[spin_15s_linear_infinite_reverse]">
              <div className="absolute -bottom-3 bg-white p-1 rounded-lg border shadow-sm">
                <GraduationCap className="h-5 w-5 text-black" />
              </div>
            </div>
            <div className="absolute w-32 h-32 rounded-full border border-zinc-100 flex items-center justify-center bg-white shadow-sm z-10">
              <span className="font-bold tracking-tight">Connect.</span>
            </div>
          </div>
        </div>

        {/* Card 02: Preferences */}
        <div className="bg-white p-8 rounded-[2rem] border border-zinc-200/80 shadow-sm flex flex-col h-[500px] relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="h-8 w-8 bg-zinc-100 rounded-md flex items-center justify-center text-xs font-bold text-zinc-500 mb-6 font-mono">
            02
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-3">
            Set your availability
          </h3>
          <p className="text-zinc-500 leading-relaxed mb-8">
            Want to block off exam weeks? Set up your buffers? We make that
            easy.
          </p>

          <div className="absolute bottom-6 left-6 right-6 bg-zinc-50 rounded-xl border border-zinc-100 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 rounded-full bg-zinc-800 relative">
                  <div className="absolute right-0.5 top-0.5 h-3 w-3 bg-white rounded-full"></div>
                </div>
                <span className="text-sm font-medium">Mon</span>
              </div>
              <div className="flex gap-2 text-xs text-zinc-500 border border-zinc-200 rounded px-2 py-1 bg-white">
                9:00am - 5:00pm
              </div>
            </div>
            <div className="flex items-center justify-between opacity-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 rounded-full bg-zinc-200 relative">
                  <div className="absolute left-0.5 top-0.5 h-3 w-3 bg-white rounded-full"></div>
                </div>
                <span className="text-sm font-medium">Tue</span>
              </div>
              <div className="flex gap-2 text-xs text-zinc-500 border border-zinc-200 rounded px-2 py-1 bg-white">
                Unavailable
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 rounded-full bg-zinc-800 relative">
                  <div className="absolute right-0.5 top-0.5 h-3 w-3 bg-white rounded-full"></div>
                </div>
                <span className="text-sm font-medium">Wed</span>
              </div>
              <div className="flex gap-2 text-xs text-zinc-500 border border-zinc-200 rounded px-2 py-1 bg-white">
                10:00am - 4:00pm
              </div>
            </div>
          </div>
        </div>

        {/* Card 03: Interview */}
        <div className="bg-white p-8 rounded-[2rem] border border-zinc-200/80 shadow-sm flex flex-col h-[500px] relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="h-8 w-8 bg-zinc-100 rounded-md flex items-center justify-center text-xs font-bold text-zinc-500 mb-6 font-mono">
            03
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-3">
            Start Interviewing
          </h3>
          <p className="text-zinc-500 leading-relaxed mb-8">
            It could be a video chat, phone call, or an on-campus walk-in.
          </p>

          <div className="absolute bottom-6 left-6 right-6 border border-zinc-100 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 h-32">
              <div className="bg-zinc-50 flex items-center justify-center border-r border-zinc-100">
                <User className="h-12 w-12 text-zinc-300" />
              </div>
              <div className="bg-zinc-50 flex items-center justify-center">
                <User className="h-12 w-12 text-zinc-300" />
              </div>
            </div>
            <div className="bg-white p-3 flex justify-center gap-4 border-t border-zinc-100">
              <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center">
                <Video className="h-4 w-4 text-zinc-600" />
              </div>
              <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center">
                <div className="h-3 w-3 bg-yellow-500 rounded-sm"></div>
              </div>
              <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center">
                <div className="h-4 w-4 border-2 border-zinc-400 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
