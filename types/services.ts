export type BrandLevel = 'life' | 'action' | 'magic';

export interface CommercialFeature {
    title: string;
    description: string;
    icon_name: string; // We will map this to Lucide icons
}

export interface CommercialLevelData {
    id: BrandLevel;
    brandName: string; // e.g., "NOVA LIFE"
    title: string; // English title e.g., "Absolute Realism"
    arTitle: string; // Arabic title e.g., "الواقعية المطلقة"
    slogan: string;
    description: string;
    features: string[]; // List of feature strings
    idealFor: string; // Use case description
    valueProp: string; // Value proposition
    posterImage: string; // Main poster image
    videoPreview?: string; // Preview video path
    gallery: string[]; // Gallery images array
    colorTheme: string; // Tailwind gradient class
}

export interface IdentityStat {
    label: string;
    value: number; // 0-100
    suffix: string; // e.g., "%"
}

export interface IdentityData {
    brandName: string;
    description: string;
    stats: IdentityStat[];
    features: {
        title: string;
        description: string;
    }[];
}

export interface EntertainmentType {
    id: 'cinema' | 'saga';
    brandName: string;
    title: string;
    posterImage: string; // Path to image
    trailerVideo?: string; // Path to trailer loop
    scriptExcerpt: string; // The "Script" text to display
    integrationMethods: {
        title: string;
        description: string;
    }[];
}

// Feature item for CinematicShowcase component
export interface CinematicFeature {
    title: string;
    description: string;
    icon_name: string; // Lucide icon name
}

// Showcase images for saga/cinema modes
export interface CinematicShowcaseData {
    mode: 'saga' | 'cinema';
    title: string;
    description: string;
    features: CinematicFeature[];
    images: string[];
}
