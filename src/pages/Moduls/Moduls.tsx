import React, { useContext, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonButtons, IonMenuButton, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonButton, IonModal, IonIcon } from '@ionic/react';
import Context, { Persona, Modul } from '../../data/context';
import { addCircleOutline } from 'ionicons/icons';

const Moduls: React.FC = () => {

    const [activityToComplete, setActivityToComplete] = useState<Persona>();

    const context = useContext(Context);

    const openCompleteModal = (persona: Persona) => {
        setActivityToComplete(persona);
    };

    const closeModal = () => {
        setActivityToComplete(undefined);
    };

    var btnClick = (modul: Modul) => {
        //context.presentAlert(modul.Nom, modul.Abrev, modul.codi.toString(), ["OK"]);
        //window.location.replace('mod-modul?modul=' + modul.codi + "&nom=" + modul.Nom + "&abrev=" + modul.Abrev);
        globalThis.localStorage.setItem("modul", JSON.stringify(modul));
        window.location.replace('mod-modul');
      };

      var btnClick2 = () => {
        //context.presentAlert("Afegir", "","Afegir", ["OK"]);
        window.location.replace("afegir-modul");
      };

    var item = globalThis.localStorage.getItem("JWT");
    context.jwt = (item ?? '');

    if((context?.moduls?.length ?? 0) == 0) {
        context.ObtenirModuls(context);
    }
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
                        <IonTitle>Moduls</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                    <IonRow key="-1">
                            <IonCol className="ion-text-center">
                                <IonCard onClick={() => btnClick2() } color="success">
                                    {/* <img src={modul.imageUrl} alt="modul"/> */}
                                    <IonCardHeader>
                                        <IonCardSubtitle>Afegir modul</IonCardSubtitle>
                                        <IonCardTitle><IonIcon icon={addCircleOutline}/></IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        { context.moduls.map(modul => (
                        <IonRow key={modul.codi.toString()}>
                            <IonCol className="ion-text-center">
                                <IonCard onClick={() => btnClick(modul) } color="warning">
                                    {/* <img src={modul.imageUrl} alt="modul"/> */}
                                    <IonCardHeader>
                                        <IonCardSubtitle>{modul.Nom}</IonCardSubtitle>
                                        <IonCardTitle>{modul.Abrev}</IonCardTitle>
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

export default Moduls;