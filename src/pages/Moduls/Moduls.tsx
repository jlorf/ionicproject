import React, { useContext, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonButtons, IonMenuButton, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonButton, IonModal, IonIcon } from '@ionic/react';
import Context, { Persona } from '../../data/context';

const Moduls: React.FC = () => {

    const [activityToComplete, setActivityToComplete] = useState<Persona>();

    const context = useContext(Context);

    const openCompleteModal = (persona: Persona) => {
        setActivityToComplete(persona);
    };

    const closeModal = () => {
        setActivityToComplete(undefined);
    };

    if((context.moduls?.length ?? 0) == 0) context.ObtenirModuls(context);
    return (
        <React.Fragment>
            {/* <IonModal isOpen={!!activityToComplete}>
                <CompleteModalActivity persona={activityToComplete as Persona} dismissModal={closeModal}/>
            </IonModal> */}

            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Moduls</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        { context.moduls.map(modul => (
                        <IonRow key={modul.codi.toString()}>
                            <IonCol className="ion-text-center">
                                <IonCard>
                                    {/* <img src={modul.imageUrl} alt="modul"/> */}
                                    <IonCardHeader>
                                        <IonCardSubtitle>{modul.Nom}</IonCardSubtitle>
                                        <IonCardTitle>{modul.Abrev}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonItem lines="none">
                                            {/* { !modul.professor ?
                                            <IonButton
                                                fill="clear"
                                                onClick={() => openCompleteModal(persona)}>
                                                Complete modul
                                            </IonButton>
                                            :
                                            <IonIcon color="success" icon={checkmarkOutline} />
                                            } */}
                                        </IonItem>
                                    </IonCardContent>
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

export default Moduls;