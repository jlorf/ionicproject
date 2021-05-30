import React, { useContext, useState } from "react";
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
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonButton,
  IonModal,
  IonIcon,
} from "@ionic/react";
import Context, { Persona, UF } from "../../data/context";
import { addCircleOutline } from "ionicons/icons";

const UFs: React.FC = () => {
  const [activityToComplete, setActivityToComplete] = useState<Persona>();

  const context = useContext(Context);

  const openCompleteModal = (persona: Persona) => {
    setActivityToComplete(persona);
  };

  const closeModal = () => {
    setActivityToComplete(undefined);
  };

  var btnClick = (uf: UF) => {
    //context.presentAlert(modul.Nom, modul.Abrev, modul.codi.toString(), ["OK"]);
    //window.location.replace('mod-modul?modul=' + modul.codi + "&nom=" + modul.Nom + "&abrev=" + modul.Abrev);
    globalThis.localStorage.setItem("UF", JSON.stringify(uf));
    window.location.replace("mod-uf");
  };

  var btnClick2 = () => {
    //context.presentAlert("Afegir", "","Afegir", ["OK"]);
    window.location.replace("afegir-uf");
  };

  var item = globalThis.localStorage.getItem("JWT");
  context.jwt = item ?? "";

  if ((context?.ufs?.length ?? 0) == 0) {
    context.ObtenirUFs(context);
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
            <IonTitle>UFs</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow key="-1">
              <IonCol className="ion-text-center">
                <IonCard onClick={() => btnClick2()} color="success">
                  {/* <img src={modul.imageUrl} alt="modul"/> */}
                  <IonCardHeader>
                    <IonCardSubtitle>Afegir UF</IonCardSubtitle>
                    <IonCardTitle>
                      <IonIcon icon={addCircleOutline} />
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
            {context.ufs.sort((a,b) => a.Nom.toLowerCase().localeCompare(b.Nom.toLowerCase()) + a.Abrev.toLowerCase().localeCompare(b.Abrev.toLowerCase())).map((uf) => (
              <IonRow key={uf.codi.toString()}>
                <IonCol className="ion-text-center">
                  <IonCard onClick={() => btnClick(uf)} color="warning">
                    {/* <img src={modul.imageUrl} alt="modul"/> */}
                    <IonCardHeader>
                      <IonCardSubtitle>{uf.Nom}</IonCardSubtitle>
                      <IonCardTitle>{uf.Abrev}</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default UFs;
