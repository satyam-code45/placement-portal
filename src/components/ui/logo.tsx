import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

export function Logo({ className }: LogoProps) {
    return (
        <Link to="/" className={cn("flex items-center gap-2 font-bold text-2xl tracking-tighter text-zinc-900", className)}>
            CampusConnect<span className="text-zinc-400">.</span>
        </Link>
    );
}
