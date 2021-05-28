import React, { useContext, useState } from "react";
import Context, { ContextModel, GrupClasse, Persona, UF } from "../../data/context";
import * as $ from "jquery";
import {
  IonPage,
  IonHeader,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonRadio,
  IonCheckbox,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonContent,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonModal,
  IonButton,
} from "@ionic/react";

export const AlumnesUF: React.FC = () => {
  const context = useContext(Context);

  let alumnesuf = Array<Persona>();
  let ufobj:UF;

  const [showModal, setShowModal] = useState(false);

  const ObtenirAlumnesUF = (ctx: ContextModel) => {
    var uf = globalThis.localStorage.getItem("UF");
    if (uf != null && uf != undefined) {
      ufobj = JSON.parse(uf) as UF;
      var item = globalThis.localStorage.getItem("JWT");
      ctx.jwt = item ?? "";
      alumnesuf = Array<Persona>();
      $.ajax({
        method: "GET",
        async: false,
        url: ctx.urlapi + "/Api/grupclasse/api.php",
        data: { jwt: ctx.jwt, uf: ufobj.codi },
      }).done(function (res) {
        //console.log(jwt);
        $.each(res.records, function (i, item: GrupClasse) {
          alumnesuf.push(
            context.alumnes.find((a) => a.codi === item.Persona) as Persona
          );
        });
      });
    }
  };

  const btnClick = async () => {
    context.presentAlert("prova", "", "", ["Ok"]);
  };

  const ModificarLlista = (alumne: Persona, chk: boolean) => {
      if (chk){
          if (alumnesuf.indexOf(alumne) == -1){
              alumnesuf.push(alumne);
          }
      } else {
        if (alumnesuf.indexOf(alumne) == -1){
            debugger;
            alumnesuf.slice(alumnesuf.indexOf(alumne), 1);
        }
      }
  }

  const MostrarModal = () => {
    setShowModal(true);
  }

  const Guardar = () => {
      var persones = Array<Uint8Array>();
      alumnesuf.map(alumne => persones.push(alumne.codi));
    $.ajax({
        method: "POST",
        url:
          context.urlapi +
          "/Api/grupclasse/api.php",//?jwt=" +
          /*context.jwt +
          "&uf=" +
          ufobj.codi +
          "&Nom=" +
          nom +
          "&Abrev=" +
          abrev +
          "&Hores=" +
          hores +
          "&Modul=" +
          mdul,*/
        data: { jwt: context.jwt, uf: ufobj.codi, persones: persones, professor: 0 },
        error: function (request, status, error) {
          context.presentAlert("UF", "Error", request.responseText, ["Ok"]);
        },
      }).done(function (res) {
        //context.presentAlert("Modul", "", res.message, ["OK"]);
        window.location.replace("ufs");
      });
    setShowModal(false);
  }

  context.ObtenirPersones(context, false);

  ObtenirAlumnesUF(context);

  return (
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
        <IonModal isOpen={showModal} cssClass="my-custom-class" onDidDismiss={() => setShowModal(false)}>
          <IonLabel className="ion-text-center">Alumnes</IonLabel>
          <IonContent>
            <IonList>
              {context.alumnes.map((alumne) => (
                <IonItem>
                    {/*onClick={ item => ModificarLlista(alumne, (item.currentTarget.children[0] as HTMLIonCheckboxElement).checked)}*/}
                  <IonCheckbox checked={alumnesuf.indexOf(alumne) != -1} onClick={ item => ModificarLlista(alumne, item.currentTarget.checked)} />
                  <IonLabel className="ion-text-center">
                    {alumne.Nom} {alumne.Cognoms}
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
          <IonButton onClick={() => Guardar()}>Guardar</IonButton>
        </IonModal>
        <IonButton expand="block" onClick={() => MostrarModal()}>
          Modificar alumnes
        </IonButton>
        {/*-- List of Text Items --*/}
        <IonList>
          {alumnesuf.map((alumne) => (
            <IonItem>
              <IonLabel className="ion-text-center">
                {alumne.Nom} {alumne.Cognoms}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
