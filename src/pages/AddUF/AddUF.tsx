import React, { useRef, useContext, useState } from "react";
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
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import Context, { ActivityType } from "../../data/context";
import { useHistory } from "react-router-dom";
import * as $ from "jquery";

const AddUF: React.FC = () => {
  const history = useHistory();
  const context = useContext(Context);

  const [toastMsg, setToastMsg] = useState<string>("");

  const nomInput = useRef<HTMLIonInputElement>(null);
  const cognomsInput = useRef<HTMLIonInputElement>(null);
  const horesInput = useRef<HTMLIonInputElement>(null);
  const modulInput = useRef<HTMLIonSelectElement>(null);

  const addUF = async () => {
    const nom = nomInput.current?.value as string;
    const abrev = cognomsInput.current?.value as string;
    const hores = horesInput.current?.value as string;
    const modul = modulInput.current?.value as string;
    $.ajax({
      method: "POST",
      url: context.urlapi + "/Api/unitatformativa/api.php",
      data: {
        jwt: context.jwt,
        Nom: nom,
        Abrev: abrev,
        Hores: hores,
        Modul: modul,
      },
      error: function (request, status, error) {
        context.presentAlert("Registre", "Error", request.responseText, ["Ok"]);
      },
    }).done(function (res) {
      //context.presentAlert("UF", "", res.message, ["OK"]);
      window.location.replace("ufs");
    });
  };

  context.ObtenirModuls(context);

  return (
    <React.Fragment>
      <IonToast
        isOpen={!!toastMsg}
        message={toastMsg}
        duration={4000}
        color="medium"
        onDidDismiss={() => setToastMsg("")}
      />

      <IonPage>
        <IonHeader>
          <IonToolbar color="dark">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Afegir UF</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Nom</IonLabel>
                  <IonInput ref={nomInput} type="text"></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Abrev</IonLabel>
                  <IonInput ref={cognomsInput} type="text"></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Hores</IonLabel>
                  <IonInput ref={horesInput} type="number"></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonSelect id="modul" name="modul" ref={modulInput}>
                {context.moduls.map((item) => (
                  <IonSelectOption key={item.codi.toString()} value={item.codi}>
                    {item.Nom + "(" + item.Abrev + ")"}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-center ion-margin-top">
                <IonButton expand="block" fill="outline" onClick={addUF}>
                  Afegir UF
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default AddUF;
