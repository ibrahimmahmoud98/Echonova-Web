import React from 'react';

export const PartnersSkeleton = () => {
    return (
        <section className="min-h-[50vh] w-full p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-video bg-white/5 rounded-xl border border-white/10" />
                ))}
            </div>
        </section>
    );
};
