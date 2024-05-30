export enum MemberType {
    PILOT = 'Pilot',
    ENGINEER = 'Engineer',
    PASSENGER = 'Passenger',
}

export enum JobType {
    DEFAULT = '',
    NAVIGATION = 'Navigation',
    SOLAR_PANELS = 'Solar panels',
    MAINTENANCE = 'Maintenance',
    MECHANICS = 'Mechanics',
}

export interface Pilot {
    experience: number;
}

export interface Engineer extends Pilot {
    job: JobType;
}

export interface Passenger {
    name: string;
    age: number;
    wealth: number;
}

export interface BaseJourneyDetails {
    journeyId: string;
    journeyName: string;
    destination: string;
    departureTime: string;
}

export interface Journey extends BaseJourneyDetails {
    pilots: Pilot[];
    engineers: Engineer[];
    passengers: Passenger[];
}
