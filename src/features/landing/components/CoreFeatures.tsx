import { Bell, ChevronDown, Shield } from "lucide-react";

export function CoreFeatures() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Resume Parsers / Filters */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-200/80 shadow-sm flex flex-col h-full min-h-[500px]">
          <div className="mb-8">
            <h3 className="text-2xl font-bold tracking-tight mb-3">
              Automated Resume Filtering
            </h3>
            <p className="text-zinc-500 leading-relaxed text-lg">
              Stop manually reviewing thousands of PDFs. Set your criteria for
              CGPA, skills, and experience, and let our ATS do the heavy
              lifting.
            </p>
          </div>

          <div className="flex-1 bg-zinc-50 rounded-2xl border border-zinc-100 p-8 flex flex-col justify-center gap-4 relative overflow-hidden">
            {/* Abstract Form Widget */}
            <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm z-10">
              <div className="text-xs font-semibold text-zinc-900 mb-2">
                Minimum CGPA
              </div>
              <div className="flex items-center justify-between border border-zinc-200 rounded-lg px-3 py-2 bg-zinc-50/50">
                <span className="text-sm text-zinc-700">8.5</span>
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm z-10">
              <div className="text-xs font-semibold text-zinc-900 mb-2">
                Required Skills
              </div>
              <div className="flex items-center justify-between border border-zinc-200 rounded-lg px-3 py-2 bg-zinc-50/50">
                <div className="flex gap-1">
                  <span className="text-xs bg-yellow-600/15 text-[#8b6914] px-1.5 py-0.5 rounded">
                    React
                  </span>
                  <span className="text-xs bg-yellow-600/15 text-[#8b6914] px-1.5 py-0.5 rounded">
                    Node.js
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </div>
            </div>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Card 2: Profile / Identity */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-200/80 shadow-sm flex flex-col h-full min-h-[500px]">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-600/15 text-xs font-medium text-[#8b6914] mb-4 w-fit">
              <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
              Verified Profiles
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-3">
              Verified Student Identities
            </h3>
            <p className="text-zinc-500 leading-relaxed text-lg">
              Every student profile comes seamlessly integrated with university
              data. Transcript-verified achievements and badges.
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center pt-8">
            <div className="bg-white border border-zinc-200 shadow-xl rounded-2xl p-6 w-[85%] relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                campus.connect/student/alex
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-zinc-100 rounded-full border border-zinc-200 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Student"
                    className="w-full h-full opacity-90"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-zinc-900">Alex Chen</h4>
                    <Shield className="h-4 w-4 text-[#c49a1b] fill-[#c49a1b]/20" />
                  </div>
                  <p className="text-xs text-zinc-500">
                    Computer Science • Top 5%
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-zinc-100 w-full rounded"></div>
                <div className="h-2 bg-zinc-100 w-3/4 rounded"></div>
              </div>
              <div className="mt-4 flex gap-2">
                <div className="h-6 px-2 bg-zinc-50 border border-zinc-200 rounded text-[10px] flex items-center font-medium">
                  Full Stack
                </div>
                <div className="h-6 px-2 bg-zinc-50 border border-zinc-200 rounded text-[10px] flex items-center font-medium">
                  UI/UX
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Calendar / Interviews */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-200/80 shadow-sm flex flex-col h-full min-h-[500px]">
          <div className="mb-8">
            <h3 className="text-2xl font-bold tracking-tight mb-3">
              Streamline Interview Scheduling
            </h3>
            <p className="text-zinc-500 leading-relaxed text-lg">
              Eliminate the back-and-forth emails. Automated slot booking for
              GDs, Technical Rounds, and HR interviews.
            </p>
          </div>

          <div className="flex-1 bg-white border-t border-zinc-100 -mx-10 -mb-10 p-10 relative">
            <div className="w-full border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
              <div className="flex border-b border-zinc-200">
                <div className="flex-1 p-3 text-center border-r border-zinc-200 bg-zinc-50/50">
                  <span className="text-xs font-bold text-zinc-400 uppercase">
                    Wed 06
                  </span>
                </div>
                <div className="flex-1 p-3 text-center border-r border-zinc-200 bg-zinc-50/50">
                  <span className="text-xs font-bold text-zinc-900 uppercase">
                    Thu 07
                  </span>
                </div>
                <div className="flex-1 p-3 text-center bg-zinc-50/50">
                  <span className="text-xs font-bold text-zinc-400 uppercase">
                    Fri 08
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 divide-x divide-zinc-200 h-48 bg-white">
                <div></div>
                <div className="p-2 space-y-2">
                  <div className="bg-yellow-600/10 border border-[#c49a1b]/30 p-2 rounded text-xs text-[#8b6914] font-medium">
                    10:00 AM Available
                  </div>
                  <div className="bg-zinc-50 border border-zinc-100 p-2 rounded text-xs text-zinc-400 line-through">
                    11:00 AM Booked
                  </div>
                  <div className="bg-yellow-600/10 border border-[#c49a1b]/30 p-2 rounded text-xs text-[#8b6914] font-medium">
                    12:00 PM Available
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            {/* Overlay Toggle */}
            <div className="absolute top-6 right-12 bg-white border border-[#c49a1b]/30 shadow-lg rounded-full px-3 py-1.5 flex items-center gap-2 z-10">
              <div className="w-8 h-4 bg-yellow-600 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-xs font-bold text-[#8b6914]">
                Auto-confirm
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Notifications */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-200/80 shadow-sm flex flex-col h-full min-h-[500px]">
          <div className="mb-8">
            <h3 className="text-2xl font-bold tracking-tight mb-3">
              Reduce Drop-offs & No-shows
            </h3>
            <p className="text-zinc-500 leading-relaxed text-lg">
              Keep everyone in the loop with automated SMS and Email reminders
              for upcoming rounds and deadlines.
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full bg-white border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 relative">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-yellow-600 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-[#c49a1b]/30">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-zinc-900 text-sm">
                      Interview Reminder
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      10m ago
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 mb-3">
                    Your technical interview with{" "}
                    <span className="font-semibold text-black">Google</span>{" "}
                    starts in 15 minutes.
                  </p>
                  <div className="flex gap-2">
                    <div className="bg-yellow-600/15 text-[#8b6914] text-[10px] font-bold px-2 py-1 rounded">
                      JOIN LINK
                    </div>
                    <div className="bg-yellow-600/5 text-[#8b6914] text-[10px] font-bold px-2 py-1 rounded border border-[#c49a1b]/30">
                      RESCHEDULE
                    </div>
                  </div>
                </div>
              </div>
              {/* Stack efffect */}
              <div className="absolute -bottom-2 left-4 right-4 h-full bg-white border border-zinc-200 rounded-2xl -z-10"></div>
              <div className="absolute -bottom-4 left-8 right-8 h-full bg-white border border-zinc-200 rounded-2xl -z-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
