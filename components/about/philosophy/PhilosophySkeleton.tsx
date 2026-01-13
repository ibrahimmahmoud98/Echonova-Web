import React from 'react';

export const PhilosophySkeleton = () => {
    return (
        <section className="h-screen w-full flex items-center justify-center bg-black">
            <div className="space-y-4 text-center animate-pulse">
                <div className="h-8 w-64 bg-white/10 rounded-full mx-auto" />
                <div className="h-4 w-96 bg-white/5 rounded mx-auto" />
                <div className="h-4 w-80 bg-white/5 rounded mx-auto" />
            </div>
        </section>
    );
};
