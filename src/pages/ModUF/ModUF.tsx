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
  IonSelectOption,
  IonSelect,
} from "@ionic/react";
import Context, { ActivityType } from "../../data/context";
import { useHistory } from "react-router-dom";
import * as $ from "jquery";

const ModUF: React.FC = () => {
  const history = useHistory();
  const context = useContext(Context);

  const [toastMsg, setToastMsg] = useState<string>("");

  //const nomInput = useRef<HTMLIonInputElement>(null);
  //const abrevInput = useRef<HTMLIonInputElement>(null);

  let codi = "";
  let nnom = "";
  let aabrev = "";
  let hhores = "";
  let mmodul = "";

  var modul = globalThis.localStorage.getItem("UF");

  if (modul !== null && modul !== "") {
    try {
      var m = JSON.parse(modul);
      codi = m.codi;
      nnom = m.Nom;
      aabrev = m.Abrev;
      hhores = m.Hores;
      mmodul = m.Modul;
    } catch {}
  }

  const [nom, setNom] = useState<string>(nnom);
  const [abrev, setAbrev] = useState<string>(aabrev);
  const [hores, setHores] = useState<string>(hhores);
  const [mdul, setModul] = useState<string>(mmodul);

  context.ObtenirModuls(context);

  const modModul = async () => {
    //const nom = nomInput.current?.value as string;
    //const abrev = abrevInput.current?.value as string;
    $.ajax({
      method: "PUT",
      url:
        context.urlapi +
        "/Api/unitatformativa/api.php?jwt=" +
        context.jwt +
        "&codi=" +
        codi +
        "&Nom=" +
        nom +
        "&Abrev=" +
        abrev +
        "&Hores=" +
        hores +
        "&Modul=" +
        mdul,
      /*data: { jwt: context.jwt, codi: codi, Nom: nom, Abrev: abrev },*/
      error: function (request, status, error) {
        context.presentAlert("UF", "Error", request.responseText, ["Ok"]);
      },
    }).done(function (res) {
      //context.presentAlert("Modul", "", res.message, ["OK"]);
      window.location.replace("ufs");
    });
  };

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
            <IonTitle>Modificar UF</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Nom</IonLabel>
                  <IonInput
                    value={nom}
                    onIonChange={(e) => setNom(e.detail.value!)}
                    type="text"
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Abreviació</IonLabel>
                  <IonInput
                    value={abrev}
                    onIonChange={(e) => setAbrev(e.detail.value!)}
                    type="text"
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Hores</IonLabel>
                  <IonInput value={hores} onIonChange={(e) => setHores(e.detail.value!)} type="number"></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonSelect id="modul" name="modul" value={mdul} onIonChange={(e) => setModul(e.detail.value!)}>
                {context.moduls.map((item) => (
                  <IonSelectOption key={item.codi.toString()} value={item.codi}>
                    {item.Nom + "(" + item.Abrev + ")"}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-center ion-margin-top">
                <IonButton expand="block" fill="outline" onClick={modModul}>
                  Modificar UF
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default ModUF;
