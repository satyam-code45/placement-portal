export default function CompanyDashboard() {
    return (
        <div className="p-8 space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Company Portal</h2>
                <p className="text-zinc-500">Manage your job postings and applicants.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 bg-white rounded-xl border border-zinc-200 shadow-sm">
                    <div className="text-sm font-medium text-zinc-500">Active Jobs</div>
                    <div className="text-3xl font-bold mt-2">5</div>
                </div>
                <div className="p-6 bg-white rounded-xl border border-zinc-200 shadow-sm">
                    <div className="text-sm font-medium text-zinc-500">Total Applicants</div>
                    <div className="text-3xl font-bold mt-2">128</div>
                </div>
                <div className="p-6 bg-white rounded-xl border border-zinc-200 shadow-sm">
                    <div className="text-sm font-medium text-zinc-500">Interviews Scheduled</div>
                    <div className="text-3xl font-bold mt-2">12</div>
                </div>
            </div>
        </div>
    );
}
