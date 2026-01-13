import React from 'react';

export const ValuesSkeleton = () => {
    return (
        <section className="min-h-screen w-full p-8 flex flex-col justify-center">
            <div className="space-y-4 max-w-4xl mx-auto w-full animate-pulse">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-20 w-full bg-white/5 rounded-xl border border-white/10" />
                ))}
            </div>
        </section>
    );
};
