import React from 'react';

export const EntertainmentSkeleton = () => {
    return (
        <section className="w-full min-h-screen bg-transparent relative p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto animate-pulse">
                <div className="aspect-[2/3] bg-white/5 rounded-2xl" />
                <div className="aspect-[2/3] bg-white/5 rounded-2xl" />
            </div>
        </section>
    );
};
