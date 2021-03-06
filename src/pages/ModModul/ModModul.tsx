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

const ModModul: React.FC = () => {

    const history = useHistory();
    const context = useContext(Context);

    const [toastMsg, setToastMsg] = useState<string>('');

    //const nomInput = useRef<HTMLIonInputElement>(null);
    //const abrevInput = useRef<HTMLIonInputElement>(null);

    
    let codi = "";
    let nnom = '';
    let aabrev = '';

    var modul = globalThis.localStorage.getItem("modul");
    
    if (modul !== null && modul !== ''){
        try {
            var m = JSON.parse(modul);
            codi = m.codi;
            nnom = m.Nom;
            aabrev = m.Abrev;
        } catch{}
    }

    const [nom, setNom] = useState<string>(nnom);
    const [abrev, setAbrev] = useState<string>(aabrev);

    const modModul = async () => {
        //const nom = nomInput.current?.value as string;
        //const abrev = abrevInput.current?.value as string;
        $.ajax({
            method: "PUT",
            url: context.urlapi + "/Api/modul/api.php?jwt=" + context.jwt + "&codi=" + codi + "&Nom=" + nom + "&Abrev=" + abrev,
            /*data: { jwt: context.jwt, codi: codi, Nom: nom, Abrev: abrev },*/
            error: function (request, status, error) {
                context.presentAlert('Registre', 'Error', request.responseText, ['Ok']);
            }
        })
            .done(function(res) {
                //context.presentAlert("Modul", "", res.message, ["OK"]);
                window.location.replace('moduls');
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
                        <IonTitle>Modificar Modul</IonTitle>
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
                                        Abreviaci??
                                    </IonLabel>
                                    <IonInput value={abrev} onIonChange={e => setAbrev(e.detail.value!)} type='text'></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className='ion-text-center ion-margin-top'>
                                <IonButton expand='block' fill='outline' onClick={modModul}>
                                    Modificar Modul
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default ModModul;
