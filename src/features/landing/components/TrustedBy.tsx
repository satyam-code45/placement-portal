export function TrustedBy() {
    return (
        <section className="py-10 border-t border-zinc-100 text-center">
            <p className="text-sm font-semibold text-zinc-400 mb-12">Trusted by fast-growing companies around the campus</p>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                    <h4 className="text-2xl font-bold font-serif italic">Mercury</h4>
                    <h4 className="text-2xl font-black tracking-tighter">coinbase</h4>
                    <h4 className="text-2xl font-bold tracking-widest flex items-center gap-2">
                        <div className="h-6 w-6 bg-black rounded-md"></div> storyblok
                    </h4>
                    <h4 className="text-2xl font-bold font-mono">AngelList</h4>
                    <h4 className="text-2xl font-bold font-sans">Raycast</h4>
                </div>
            </div>
        </section>
    );
}
