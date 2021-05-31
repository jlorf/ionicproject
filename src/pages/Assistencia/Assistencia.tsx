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
import { data } from "jquery";

export const Assistencia: React.FC = () => {
  const context = useContext(Context);

  let alumnesuf = Array<Persona>();
  let ufobj: UF = null as unknown as UF;

  var modul:string = globalThis.localStorage.getItem("UFSEL") as string;
  var dt:string = globalThis.localStorage.getItem("DATA") as string;
  const [uf, setUF] = useState<string>(modul ?? null);
  const [showModal, setShowModal] = useState(false);
  let dtt = dt != null && dt != undefined ? new Date(JSON.parse(dt)) : new Date()
  const [data, setData] = useState<Date>(dtt);

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
        data: { jwt: ctx.jwt, uf: uf },
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
    alumnesuf[index].professor = chk;
  };

  const MostrarModal = () => {
    setShowModal(true);
  };

  const ObtenirAssistencia = (ctx : ContextModel) => {
    $.ajax({
      method: "GET",
      url: context.urlapi + "/Api/assistencia/api.php",
      data: {
        jwt: ctx.jwt,
        uf: ufobj,
        data: data.toJSON().slice(0, 16),
      },
      async: false,
      error: function (request, status, error) {
        // debugger;
        // ctx.presentAlert("UF", "Error", request.responseText, ["Ok"]);
      },
    }).done(function (res) {
      $.each(res.records, function(i, item) {
        let alumne = alumnesuf.find(a => a.codi == item.Alumne) as Persona;
        alumne.professor = JSON.parse(item.Present) == 1 ? true : false;
      });
    });
    //setShowModal(false);
  };

  const Guardar = () => {
    var persones = Array<object>();
    alumnesuf.map((alumne) => persones.push({Alumne: alumne.codi, Esta: alumne.professor ? 1 : 0}));
    //data.setMinutes(data.getMinutes() - data.getTimezoneOffset());
    if ((persones?.length ?? 0) == 0)
      persones.push(-1 as unknown as Uint8Array);
    $.ajax({
      method: "POST",
      url: context.urlapi + "/Api/assistencia/api.php", //?jwt=" +
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
        uf: ufobj,
        alumnes: persones,
        data: data.toJSON().slice(0, 16),
      },
      error: function (request, status, error) {
        context.presentAlert("UF", "Error", request.responseText, ["Ok"]);
      },
    }).done(function (res) {
      //context.presentAlert("Modul", "", res.message, ["OK"]);
      //window.location.replace("assistencia");
    });
    setShowModal(false);
  };

  const updateUF = (selected: string) => {
    globalThis.localStorage.setItem("UFSEL", selected);
    window.location.replace("assistencia");
  }

  const updateData = (selected: Date) => {
    globalThis.localStorage.setItem("DATA", JSON.stringify(selected));
    window.location.replace("assistencia");
  }

  context.ObtenirPersones(context, false);

  context.ObtenirUFs(context);

  ObtenirAlumnesUF(context);
debugger;
  if (data != null && data != undefined) ObtenirAssistencia(context);

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
                value={data.toUTCString()}
                onIonChange={(e) => updateData(new Date(Date.parse(e.detail.value!)))}
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
