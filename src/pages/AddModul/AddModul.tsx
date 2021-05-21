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

const AddModul: React.FC = () => {

    const history = useHistory();
    const context = useContext(Context);

    const [toastMsg, setToastMsg] = useState<string>('');

    const nomInput = useRef<HTMLIonInputElement>(null);
    const abrevInput = useRef<HTMLIonInputElement>(null);

    const addModul = async () => {
        const nom = nomInput.current?.value as string;
        const abrev = abrevInput.current?.value as string;
        $.ajax({
            method: "POST",
            url: context.urlapi + "/Api/modul/api.php",
            data: { jwt: context.jwt, Nom: nom, Abrev: abrev },
            error: function (request, status, error) {
                debugger;
                context.presentAlert('Registre', 'Error', request.responseText, ['Ok']);
            }
        })
            .done(function(res) {
                context.presentAlert("Modul", "", res.message, ["OK"]);
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
                        <IonTitle>Afegir modul</IonTitle>
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
                                    <IonInput ref={nomInput} type='text'></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position='floating'>
                                        Abreviació
                                    </IonLabel>
                                    <IonInput ref={abrevInput} type='text'></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className='ion-text-center ion-margin-top'>
                                <IonButton expand='block' fill='outline' onClick={addModul}>
                                    Afegir Modul
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default AddModul;
