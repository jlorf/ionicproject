import React from 'react';

export type ActivityType = 'rest' | 'work' | 'hobby';

export interface Activity {
    id: string;
    title: string;
    description: string;
    hour: string;
    activityType: ActivityType;
    imageUrl: string;
    isCompleted: boolean;
}

export interface Persona {
    codi: BigInteger;
    Nom: string;
    Cognoms: string;
    professor: boolean;
}

export interface ActivitiesContextModel {
    activities: Activity[];
    professors: Persona[];
    alumnes: Persona[];
    ObtenirPersones: (professor: boolean) => void;
    addActivity: (title: string, description: string, activityType: ActivityType) => void;
    completeActivity: (activityId: string) => void;
}

const ActivitiesContext = React.createContext<ActivitiesContextModel>({
    activities: [],
    professors: [],
    alumnes: [],
    addActivity: () => {},
    completeActivity: () => {},
    ObtenirPersones: () => {}
});

export default ActivitiesContext;