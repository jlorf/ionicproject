import React from "react";
import * as $ from "jquery";

export type ActivityType = "rest" | "work" | "hobby";

export interface Activity {
  id: string;
  title: string;
  description: string;
  hour: string;
  activityType: ActivityType;
  imageUrl: string;
  isCompleted: boolean;
}

export interface Persona {
  codi: BigInteger;
  Nom: string;
  Cognoms: string;
  professor: boolean;
}

export interface Modul {
  codi: BigInteger;
  Nom: string;
  Abrev: string;
}

export interface LoginReturn {
  message: string;
  jwt: string;
}

export interface Validar {
  message: string;
  data: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}

export interface ContextModel {
  activities: Activity[];
  professors: Persona[];
  alumnes: Persona[];
  moduls: Modul[];
  ufs: UF[];
  jwt: string;
  urlapi: string;
  logged: boolean;
  ObtenirPersones: (ctx: ContextModel, professor: boolean) => void;
  ObtenirModuls: (ctx: ContextModel) => void;
  ObtenirUFs: (ctx: ContextModel) => void;
  addActivity: (
    title: string,
    description: string,
    activityType: ActivityType
  ) => void;
  completeActivity: (activityId: string) => void;
  Login: (ctx: ContextModel, email: string, password: string) => void;
  Registrar: (
    ctx: ContextModel,
    nom: string,
    cognom: string,
    email: string,
    password: string
  ) => void;
  presentAlert: (
    titol: string,
    subtitol: string,
    text: string,
    buttons: string[]
  ) => void;
  ComprovarJWT: (ctx: ContextModel) => boolean;
}

export interface UF {
  codi: string;
  Nom: string;
  Abrev: string;
  Hores: string;
  Modul: string;
}

export interface GrupClasse {
  UF: string;
  Persona: BigInteger;
  professor: string;
}

const Context = React.createContext<ContextModel>({
  activities: [],
  professors: [],
  alumnes: [],
  moduls: [],
  ufs: [],
  jwt: globalThis.localStorage.getItem("JWT") ?? "",
  logged: false,
  urlapi: "http://192.168.1.210/Projecte",
  addActivity: () => {},
  completeActivity: () => {},
  ObtenirPersones: () => {},
  ObtenirModuls: () => {},
  ObtenirUFs: () => {},
  Login: () => {},
  Registrar: () => {},
  presentAlert: () => {},
  ComprovarJWT: (ctx: ContextModel) => {
    var item = globalThis.localStorage.getItem("JWT");
    ctx.jwt = item ?? "";
    var res = $.ajax({
      method: "POST",
      url: ctx.urlapi + "/JWT/validate_token.php",
      data: { jwt: ctx.jwt },
      async: false,
    }).responseText;
    if (res != null && res != undefined) {
      var resJSON = JSON.parse(res);
      // .done(function(res: Validar) {
      if (resJSON?.message == "Access granted." && resJSON?.data != null) {
        //activitiesContext.jwt = res.jwt;
        ctx.logged = true;
        ctx.jwt = item ?? "";
      } else {
        ctx.logged = false;
      }
    } else {
      ctx.logged = false;
    }
    return ctx.logged;
  },
});

export default Context;
