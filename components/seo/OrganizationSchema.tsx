'use client';

import React from 'react';

export const OrganizationSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ECHONOVA STUDIO",
        "url": "https://echonova.studio",
        "logo": "https://echonova.studio/logo.png",
        "sameAs": [
            "https://twitter.com/echonovastudio",
            "https://instagram.com/echonovastudio",
            "https://linkedin.com/company/echonovastudio"
        ],
        "description": "Saudi AI-driven creative studio redefining visual content. From cinema to virtual identity.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Riyadh",
            "addressCountry": "SA"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
