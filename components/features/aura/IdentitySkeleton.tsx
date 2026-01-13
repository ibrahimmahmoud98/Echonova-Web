import React from 'react';

export const IdentitySkeleton = () => {
    return (
        <section className="w-full min-h-[80vh] bg-transparent relative flex items-center justify-center p-8">
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl animate-pulse">
                <div className="flex-1 h-[500px] bg-white/5 rounded-3xl" />
                <div className="flex-1 flex flex-col gap-4">
                    <div className="h-10 w-48 bg-white/10 rounded" />
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-full bg-white/5 rounded" />
                </div>
            </div>
        </section>
    );
};
