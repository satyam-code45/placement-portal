import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, MapPin, Search } from "lucide-react";

// Mock Data
const JOBS = [
    {
        id: 1,
        company: "Acme Corp",
        logo: "https://ui-avatars.com/api/?name=Acme+Corp&background=000&color=fff",
        title: "Software Engineer Intern",
        type: "Internship",
        location: "Remote",
        salary: "$30/hr",
        tags: ["React", "TypeScript", "Node.js"],
        posted: "2d ago",
    },
    {
        id: 2,
        company: "GlobalBank",
        logo: "https://ui-avatars.com/api/?name=Global+Bank&background=000&color=fff",
        title: "Product Designer",
        type: "Full-time",
        location: "New York, NY",
        salary: "$120k - $150k",
        tags: ["Figma", "UI/UX", "Design System"],
        posted: "1d ago",
    },
    {
        id: 3,
        company: "TechStart",
        logo: "https://ui-avatars.com/api/?name=Tech+Start&background=000&color=fff",
        title: "Frontend Developer",
        type: "Full-time",
        location: "San Francisco, CA",
        salary: "$130k - $160k",
        tags: ["Vue.js", "Tailwind", "SaaS"],
        posted: "4h ago",
    },
    {
        id: 4,
        company: "Innovate AI",
        logo: "https://ui-avatars.com/api/?name=Innovate+AI&background=000&color=fff",
        title: "Machine Learning Engineer",
        type: "Remote",
        location: "Remote",
        salary: "$150k - $180k",
        tags: ["Python", "PyTorch", "AI"],
        posted: "Just now",
    },
    {
        id: 5,
        company: "DevOps Inc",
        logo: "https://ui-avatars.com/api/?name=DevOps+Inc&background=000&color=fff",
        title: "DevOps Engineer",
        type: "Full-time",
        location: "Austin, TX",
        salary: "$110k - $140k",
        tags: ["AWS", "Docker", "Kubernetes"],
        posted: "3d ago",
    },
];

const FILTERS = ["All", "Internship", "Full-time", "Remote"];

export default function JobBoard() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredJobs = JOBS.filter((job) => {
        const matchesFilter =
            activeFilter === "All" ||
            (activeFilter === "Remote"
                ? job.location === "Remote"
                : job.type === activeFilter);
        const matchesSearch =
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 md:px-6 py-8 space-y-8 max-w-5xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
                    <p className="text-muted-foreground mt-1">
                        Find your next career opportunity.
                    </p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search jobs..."
                        className="pl-9 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {FILTERS.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeFilter === filter
                                ? "bg-black text-white shadow-md ring-2 ring-black ring-offset-2 ring-offset-background"
                                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Job List */}
            <div className="grid gap-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <Card
                            key={job.id}
                            className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 hover:shadow-md transition-all duration-200 border-gray-200 cursor-pointer"
                        >
                            {/* Logo */}
                            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden border border-gray-100">
                                <img
                                    src={job.logo}
                                    alt={`${job.company} logo`}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-900 truncate">
                                        {job.company}
                                    </span>
                                    <span className="text-xs text-muted-foreground">• {job.posted}</span>
                                </div>
                                <h3 className="text-base font-bold text-gray-900 group-hover:underline decoration-2 underline-offset-4">
                                    {job.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {job.location}
                                    </div>
                                    <div className="hidden sm:block text-gray-300">|</div>
                                    <div className="font-medium text-gray-700">{job.salary}</div>
                                </div>
                            </div>

                            {/* Tags & Action */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 sm:ml-auto w-full sm:w-auto mt-2 sm:mt-0">
                                <div className="flex flex-wrap gap-2">
                                    {job.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="bg-gray-100 text-gray-600 hover:bg-gray-200 font-normal"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors hidden sm:block" />
                                <Button className="w-full sm:hidden" size="sm">
                                    Apply Now
                                </Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>No jobs found matching your criteria.</p>
                        <Button
                            variant="link"
                            onClick={() => {
                                setActiveFilter("All");
                                setSearchQuery("");
                            }}
                            className="mt-2 text-black"
                        >
                            Clear filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
