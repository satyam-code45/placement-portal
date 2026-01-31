export default function AdminDashboard() {
    return (
        <div className="p-8 space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-red-600">Admin Portal</h2>
                <p className="text-zinc-500">Restricted Access. Manage college placement activities.</p>
            </div>
            <div className="p-6 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                Admin capabilities loaded.
            </div>
        </div>
    );
}
