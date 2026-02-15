'use client';

import React from 'react';

export const OrganizationSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ECHONOVA STUDIO",
        "alternateName": [
            "Echonova",
            "Echonova Studio",
            "إيكونوڤا",
            "استوديو إيكونوڤا",
            "Echonova KSA",
            "Echonova Riyadh"
        ],
        "url": "https://echonova.studio",
        "logo": "https://echonova.studio/logo.png",
        "sameAs": [
            "https://twitter.com/echonovastudio",
            "https://instagram.com/echonovastudio",
            "https://linkedin.com/company/echonovastudio",
            "https://www.tiktok.com/@echonovastudio",
            "https://vimeo.com/echonovastudio"
        ],
        "description": {
             "@language": "en",
             "@value": "Saudi AI-driven creative studio redefining visual content. From cinema to virtual identity."
        },
        "description_ar": {
             "@language": "ar",
             "@value": "استوديو إيكونوڤا: استوديو إبداعي سعودي يعيد تعريف المحتوى البصري باستخدام الذكاء الاصطناعي. من الإنتاج السينمائي إلى الهوية الافتراضية."
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Riyadh Front",
            "addressLocality": "Riyadh",
            "addressRegion": "Riyadh",
            "postalCode": "11564",
            "addressCountry": "SA"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "areaServed": ["SA", "GCC"],
            "availableLanguage": ["en", "ar"]
        },
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 24.7136,
                "longitude": 46.6753
            },
            "geoRadius": "1000"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
