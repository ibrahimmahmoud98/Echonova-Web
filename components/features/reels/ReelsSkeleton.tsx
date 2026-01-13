import React from 'react';

export const CommercialsSkeleton = () => {
    return (
        <section className="w-full min-h-screen bg-transparent relative flex items-center justify-center p-8">
            <div className="text-center animate-pulse">
                <div className="h-12 w-64 bg-white/10 rounded-full mx-auto mb-8" />
                <div className="h-96 w-full max-w-4xl bg-white/5 rounded-3xl mx-auto border border-white/10" />
            </div>
        </section>
    );
};
