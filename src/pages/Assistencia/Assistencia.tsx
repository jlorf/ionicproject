import React, { useContext, useState } from "react";
import Context, {
  ContextModel,
  GrupClasse,
  Persona,
  UF,
} from "../../data/context";
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
  IonDatetime,
  IonGrid,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonCol,
} from "@ionic/react";

export const Assistencia: React.FC = () => {
  const context = useContext(Context);

  let alumnesuf = Array<Persona>();
  let ufobj: UF = null as unknown as UF;

  var modul = globalThis.localStorage.getItem("UFSEL");
  let codi = "";
  let nnom = "";
  let aabrev = "";
  let hhores = "";
  let mmodul = "";

  if (modul !== null && modul !== "") {
    try {
        ufobj = JSON.parse(modul) as UF;
      codi = ufobj.codi;
      nnom = ufobj.Nom;
      aabrev = ufobj.Abrev;
      hhores = ufobj.Hores;
      mmodul = ufobj.Modul;
    } catch {}
  }

  const [uf, setUF] = useState<string>(ufobj?.codi ?? null);
  const [showModal, setShowModal] = useState(false);

  const ObtenirAlumnesUF = (ctx: ContextModel) => {
    var uf = globalThis.localStorage.getItem("UFSEL");
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
            let persona = context.alumnes.find((a) => a.codi === item.Persona) as Persona;
            persona.professor = false;
          alumnesuf.push(persona);
        });
      });
    }
  };

  const btnClick = async () => {
    context.presentAlert("prova", "", "", ["Ok"]);
  };

  const ModificarLlista = (alumne: Persona, chk: boolean) => {
    let index = alumnesuf.indexOf(alumne);
    if (chk) {
      if (index == -1) {
        alumnesuf.push(alumne);
      }
    } else {
      if (index != -1) {
        alumnesuf.splice(index, 1);
      }
    }
  };

  const MostrarModal = () => {
    setShowModal(true);
  };

  const Guardar = () => {
    var persones = Array<Uint8Array>();
    alumnesuf.map((alumne) => persones.push(alumne.codi));
    if ((persones?.length ?? 0) == 0)
      persones.push(-1 as unknown as Uint8Array);
    $.ajax({
      method: "POST",
      url: context.urlapi + "/Api/grupclasse/api.php", //?jwt=" +
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
          uf,*/
      data: {
        jwt: context.jwt,
        uf: ufobj.codi,
        persones: persones,
        professor: 0,
      },
      error: function (request, status, error) {
        context.presentAlert("UF", "Error", request.responseText, ["Ok"]);
      },
    }).done(function (res) {
      //context.presentAlert("Modul", "", res.message, ["OK"]);
      window.location.replace("mod-uf");
    });
    setShowModal(false);
  };

  const updateUF = (selected: UF) => {
    globalThis.localStorage.setItem("UFSEL", JSON.stringify(selected));
    window.location.replace("assistencia");
  }

  context.ObtenirPersones(context, false);

  context.ObtenirUFs(context);

  ObtenirAlumnesUF(context);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Assistencia UF</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonSelect
                id="modul"
                name="modul"
                value={uf}
                onIonChange={(e) => updateUF(e.detail.value!)}
              >
                {context.ufs.sort((a,b) => a.Nom.toLowerCase().localeCompare(b.Nom.toLowerCase()) + a.Abrev.toLowerCase().localeCompare(b.Abrev.toLowerCase())).map((item) => (
                  <IonSelectOption key={item.codi} value={item.codi}>
                    {item.Nom + "(" + item.Abrev + ")"}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>
            <IonCol>
              <IonDatetime
                displayFormat="DD MMMM YYYY HH:mm"
                placeholder="Select Date"
                value={new Date().toString()}
              ></IonDatetime>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton expand="block" onClick={() => Guardar()}>
          Guardar
        </IonButton>
        {/*-- List of Text Items --*/}
        <IonList>
          {alumnesuf.sort((a,b) => a.Nom.toLowerCase().localeCompare(b.Nom.toLowerCase()) + a.Cognoms.toLowerCase().localeCompare(b.Cognoms.toLowerCase())).map((alumne) => (
            <IonItem>
            {/*onClick={ item => ModificarLlista(alumne, (item.currentTarget.children[0] as HTMLIonCheckboxElement).checked)}*/}
            <IonCheckbox
              checked={(alumnesuf.find((a) => a.codi === alumne.codi) as Persona).professor}
              onClick={(item) =>
                ModificarLlista(alumne, item.currentTarget.checked)
              }
            />
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
