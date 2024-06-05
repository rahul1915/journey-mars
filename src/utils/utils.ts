import { Engineer, Journey, Passenger, Pilot } from '../types/types';

export const getUpdatedFromData = (
    toAdd: boolean,
    type: string,
    member: Pilot | Engineer | Passenger,
    formData: Journey
): Journey => {
    const newFormData = { ...formData };

    const isSamePilot = (p: Pilot) => (p as Pilot).experience === (member as Pilot).experience;
    const isSameEngineer = (e: Engineer) =>
        (e as Engineer).experience === (member as Engineer).experience && e.job === (member as Engineer).job;
    const isSamePassenger = (p: Passenger) =>
        p.name === (member as Passenger).name &&
        p.age === (member as Passenger).age &&
        p.wealth === (member as Passenger).wealth;

    switch (type) {
        case 'Pilot':
            if (toAdd) {
                newFormData.pilots = [...newFormData.pilots, member as Pilot];
            } else {
                newFormData.pilots = newFormData.pilots.filter((p) => !isSamePilot(p));
            }
            break;
        case 'Engineer':
            if (toAdd) {
                newFormData.engineers = [...newFormData.engineers, member as Engineer];
            } else {
                newFormData.engineers = newFormData.engineers.filter((e) => !isSameEngineer(e));
            }
            break;
        case 'Passenger':
            if (toAdd) {
                newFormData.passengers = [...newFormData.passengers, member as Passenger];
            } else {
                newFormData.passengers = newFormData.passengers.filter((p) => !isSamePassenger(p));
            }
            break;
        default:
            return formData;
    }

    return newFormData;
};
