'use client';

import React from 'react';

export const OrganizationSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ECHONOVA STUDIO",
        "alternateName": [
            "إيكونوڤا ستوديو", "ايكونوفا ستوديو", "إيكونوڤا ستديو", "ايكونوفا ستديو",
            "إيكونوڤا", "ايكونوفا", "استوديو إيكونوڤا", "استوديو ايكونوفا",
            "ستوديو إيكونوڤا", "ستوديو ايكونوفا", "ستديو إيكونوڤا", "ستديو ايكونوفا",
            "إيكو نوفا", "ايكو نوفا", "شركة إيكونوڤا", "شركة ايكونوفا",
            "إيكونوڤا للإنتاج الفني", "ايكونوفا للإنتاج", "إيكونوڤا ذكاء اصطناعي", "ايكونوفا ذكاء اصطناعي",
            "إيكونوڤا ميديا", "ايكونوفا ميديا", "Echonova Studio", "Echonova Studios",
            "Echo Nova Studio", "Echo Nova Studios", "Echonova", "Echo Nova",
            "ECHONOVA", "ECHONOVA STUDIO", "echo nova", "echonova", "Echo-Nova",
            "EchoNova Studio", "Echonova Creative", "Echonova AI", "Echo Nova AI",
            "Echonova Production", "Echonova Digital", "Echonova Agency",
            "إيكونوفا", "ايكنوفا", "ايكونافا", "Echonuva", "Echonovva",
            "Ekonova", "Econova", "Ikonova", "Echonova.com", "Echonova-Studio",
            "Echonovastudio", "إستوديو إيكونوڤا", "إستوديو ايكونوڤا", "إستوديو إيكونوفا",
            "إستوديو ايكونوفا", "إستديو إيكونوڤا", "إستديو ايكونوڤا", "إستديو إيكونوفا",
            "إستديو ايكونوفا", "استوديو إيكونفا", "استديو إيكونفا", "ستوديو إيكونفا",
            "ستديو ايكونفا", "إستوديو إيكنوفا", "إستديو ايكنوفا", "إيكونوفا إستديو",
            "ايكونوڤا إستوديو", "إيكونفا ستوديو", "ايكونفا ستديو", "إيكنوفا ستوديو",
            "ايكنوفا ستديو", "إستوديو إيكو نوفا", "إستديو إيكو نوفا", "أستوديو إيكونوڤا",
            "أستديو ايكونوڤا", "إيكونوفا إستوديو", "إيكونوڤا إستديو", "ايكونفا استوديو",
            "إيكونفا استديو", "إيكنوفا استوديو", "ايكنوفا استديو", "إستوديو إيكو نوفا",
            "إستديو إيكو نوفا"
        ],
        "url": "https://www.echonovastudio.com",
        "logo": "https://www.echonovastudio.com/logo.png",
        "sameAs": [
            "https://x.com/echonovastudio?s=21",
            "https://www.tiktok.com/@echonovastudio?_r=1&_t=ZS-93w0dbFWjDN",
            "https://www.instagram.com/echonova_studio?igsh=MXgzbDEyMXV5N282dw%3D%3D&utm_source=qr",
            "https://youtube.com/@echonova_studio?si=p_E0sOxiUh_CqDU8"
        ],
        "description": {
             "@language": "en",
             "@value": "Global AI-driven creative studio redefining visual content. From cinema to virtual identity."
        },
        "description_ar": {
             "@language": "ar",
             "@value": "استوديو إيكونوڤا: استوديو إبداعي عالمي يعيد تعريف المحتوى البصري باستخدام الذكاء الاصطناعي. من الإنتاج السينمائي إلى الهوية الافتراضية."
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
