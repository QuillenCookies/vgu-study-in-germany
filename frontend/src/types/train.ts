// (a) Train Types
export interface TrainType {
    id: string;
    category: 'Long-Distance' | 'Local Transit' | 'Regional Rail';
    codes: string[]; // e.g., ['ICE', 'IC', 'ECE']
    shortDescription: string;
    fullDetails: string;
    icon?: string;
}

// (b) Transport Companies
export interface TransportCompany {
    id: string;
    name: string;
    shortDescription: string;
    fullDetails: string;
    websiteUrl: string;
}

// (c) Ticket Types
export interface TicketInfo {
    id: string;
    name: string;
    priceRange: string;
    shortDescription: string;
    isStudentTicket: boolean;
    howToGetIt: string[]; // Steps to acquire
    fullDetails: string;
}

// (d) Cultural Tips
export interface CulturalTip {
    id: string;
    title: string;
    teaser: string;
    fullStory: string;
    tags: string[];
}

// (e) Journey API Types
export interface JourneyOption {
    journeyId: string;
    departure: string;
    arrival: string;
    duration: number; // in minutes
    transfers: number;
    priceEstimate: number | null; // in Euros
    transportTypes: string[]; // e.g., ['ICE', 'S-Bahn']
}