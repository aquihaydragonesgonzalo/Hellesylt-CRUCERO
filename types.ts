export interface Coordinate {
    lat: number;
    lng: number;
}

export interface Activity {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    locationName: string;
    endLocationName?: string;
    coords: Coordinate;
    endCoords?: Coordinate;
    description: string;
    fullDescription: string;
    tips: string;
    keyDetails: string;
    priceNOK: number;
    priceEUR: number;
    type: 'food' | 'logistics' | 'sightseeing' | 'transport';
    completed: boolean;
    notes?: string;
    instagramUrl?: string;
    webcamUrl?: string;
    ticketUrl?: string;
    hasAudioGuide?: boolean;
}

export interface AudioTrack {
    id: number;
    title: string;
    text: string;
}

export interface Pronunciation {
    word: string;
    phonetic: string;
    simplified: string;
    meaning: string;
}

export interface CustomExpense {
    id: string;
    title: string;
    priceNOK: number;
    priceEUR: number;
    type: 'extra';
}