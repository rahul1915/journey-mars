import { JobType, Journey } from '../types/types';

const PILOT_MIN_EXPERIENCE = 10;
const PILOT_MAX_EXPERIENCE = 80;
const ENGINEER_MIN_EXPERIENCE = 1;
const PASSENGER_MIN_AGE = 5;
const PASSENGER_WEALTH_WILD_CARD = 10;
const PASSENGER_MIN_COUNT_WITHOUT_WILD_CARD = 10;

export const validateJourney = (journey: Journey): string[] => {
    const errors: string[] = [];

    // Check if mission name and departure date are provided
    if (!journey.journeyName) {
        errors.push('Journey name is required.');
    }
    if (!journey.departureTime) {
        errors.push('Departure date is required.');
    }

    // Check if there is exactly one pilot
    if (journey.pilots.length !== 1) {
        errors.push('There must be exactly one pilot.');
    }

    // Check if all engineers have different jobs
    const jobSet = new Set<string>();
    for (const engineer of journey.engineers) {
        if (jobSet.has(engineer.job)) {
            errors.push(`Engineer job '${engineer.job}' is duplicated.`);
            break;
        }
        jobSet.add(engineer.job);
    }

    // Check if there is at least one passenger
    if (journey.passengers.length < 1) {
        errors.push('There must be at least one passenger.');
    }

    if (journey.passengers.length > 0) {
        const index = journey.passengers.findIndex((p) => p.wealth >= PASSENGER_WEALTH_WILD_CARD);
        if (index === -1 && journey.passengers.length < PASSENGER_MIN_COUNT_WITHOUT_WILD_CARD) {
            errors.push('Passenger should have min 10M or At least 10 passengers should be added');
        }
    }

    return errors;
};

export const validatePilot = (name: string, value: string | number): string => {
    if (
        name === 'experience' &&
        (Number.isNaN(value) || value < PILOT_MIN_EXPERIENCE || value > PILOT_MAX_EXPERIENCE)
    ) {
        return 'Pilot should have at experience between 10 - 80';
    }
    return '';
};

export const validatePassenger = (name: string, value: string | number): string => {
    if (name === 'name' && !value.toString().trim()) {
        return 'Name is required';
    }
    if (name === 'age' && (Number.isNaN(value) || value <= PASSENGER_MIN_AGE)) {
        return 'Age should be greater than 18';
    }
    if (name === 'wealth' && (Number.isNaN(value) || value <= 1)) {
        return 'Minimum wealth should be greater than 1 million';
    }
    return '';
};

export const validateEngineer = (name: string, value: string | number | JobType): string => {
    if (name === 'experience' && (Number.isNaN(value) || value < ENGINEER_MIN_EXPERIENCE)) {
        return 'Engineer should have at least 5 years of experience';
    }
    if (name === 'job' && value.toString() === '') {
        return 'Select a Job';
    }
    return '';
};
