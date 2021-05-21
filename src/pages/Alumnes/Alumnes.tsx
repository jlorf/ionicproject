import React, { useContext, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonButtons, IonMenuButton, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonButton, IonModal, IonIcon } from '@ionic/react';
import Context, { Persona } from '../../data/context';

const Alumnes: React.FC = () => {

    const [activityToComplete, setActivityToComplete] = useState<Persona>();

    const context = useContext(Context);

    const openCompleteModal = (persona: Persona) => {
        setActivityToComplete(persona);
    };

    const closeModal = () => {
        setActivityToComplete(undefined);
    };

    if((context.alumnes?.length ?? 0) == 0) context.ObtenirPersones(context, false);
    return (
        <React.Fragment>
            {/* <IonModal isOpen={!!activityToComplete}>
                <CompleteModalActivity persona={activityToComplete as Persona} dismissModal={closeModal}/>
            </IonModal> */}

            <IonPage>
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Alumnes</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        { context.alumnes.map(alumne => (
                        <IonRow key={alumne.codi.toString()}>
                            <IonCol className="ion-text-center">
                                <IonCard color="warning">
                                    {/* <img src={alumne.imageUrl} alt="alumne"/> */}
                                    <IonCardHeader>
                                        <IonCardSubtitle>{alumne.Nom}</IonCardSubtitle>
                                        <IonCardTitle>{alumne.Cognoms}</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        ))
                        }
                    </IonGrid>
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default Alumnes;