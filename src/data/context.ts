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

export interface Modul {
    codi: BigInteger;
    Nom: string;
    Abrev: string;
}

export interface LoginReturn {
    message: string;
    jwt: string;
}

export interface ContextModel {
    activities: Activity[];
    professors: Persona[];
    alumnes: Persona[];
    moduls: Modul[];
    jwt: string;
    ObtenirPersones: (professor: boolean) => void;
    ObtenirModuls: () => void;
    addActivity: (title: string, description: string, activityType: ActivityType) => void;
    completeActivity: (activityId: string) => void;
    Login: (email: string, password: string) => void;
    Registrar: (nom: string, cognom: string, email: string, password: string) => void;
    presentAlert: (titol: string, subtitol: string, text: string, buttons: string[]) => void;
}

const Context = React.createContext<ContextModel>({
    activities: [],
    professors: [],
    alumnes: [],
    moduls: [],
    jwt: '',
    addActivity: () => {},
    completeActivity: () => {},
    ObtenirPersones: () => {},
    ObtenirModuls: () => {},
    Login: () => {},
    Registrar: () => {},
    presentAlert: () => {}
});

export default Context;