import React, { useRef, useContext, useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonButtons,
    IonMenuButton,
    IonRow,
    IonCol,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    IonToast,
} from '@ionic/react';
import Context, { ActivityType } from '../../data/context';
import { useHistory } from 'react-router-dom';
import * as $ from 'jquery'

const ModAlumne: React.FC = () => {

    const history = useHistory();
    const context = useContext(Context);

    const [toastMsg, setToastMsg] = useState<string>('');

    //const nomInput = useRef<HTMLIonInputElement>(null);
    //const abrevInput = useRef<HTMLIonInputElement>(null);

    
    let ccodi = "";
    let nnom = '';
    let cognoms = '';

    var alumne = globalThis.localStorage.getItem("alumne");
    
    if (alumne !== null && alumne !== ''){
        try {
            var m = JSON.parse(alumne);
            ccodi = m.codi;
            nnom = m.Nom;
            cognoms = m.Cognoms;
        } catch{}
    }

    const [nom, setNom] = useState<string>(nnom);
    const [abrev, setAbrev] = useState<string>(cognoms);

    const modalumne = async () => {
        //const nom = nomInput.current?.value as string;
        //const abrev = abrevInput.current?.value as string;
        $.ajax({
            method: "PUT",
            url: context.urlapi + "/Api/persona/api.php?jwt=" + context.jwt + "&codi=" + ccodi + "&Nom=" + nom + "&Cognoms=" + abrev,// + "&professor=0",
            //data: { jwt: context.jwt, codi: ccodi, Nom: nom, Cognoms: abrev, professor: 0 },
            error: function (request, status, error) {
                context.presentAlert('Registre', 'Error', request.responseText, ['Ok']);
            }
        })
            .done(function(res) {
                //context.presentAlert("alumne", "", res.message, ["OK"]);
                window.location.replace('alumnes');
        });
    };

    return (
        <React.Fragment>

            <IonToast isOpen={!!toastMsg} message={toastMsg} duration={4000} color="medium" onDidDismiss={() => setToastMsg('')}/>

            <IonPage>
                <IonHeader>
                    <IonToolbar color="dark">
                        <IonButtons slot='start'>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Modificar alumne</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position='floating'>
                                        Nom
                                    </IonLabel>
                                    <IonInput value={nom} onIonChange={e => setNom(e.detail.value!)} type='text'></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position='floating'>
                                        Abreviació
                                    </IonLabel>
                                    <IonInput value={abrev} onIonChange={e => setAbrev(e.detail.value!)} type='text'></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className='ion-text-center ion-margin-top'>
                                <IonButton expand='block' fill='outline' onClick={modalumne}>
                                    Modificar alumne
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default ModAlumne;
