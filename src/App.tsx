import React, { useContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import AllActivities from "./pages/AllActivities/AllActivities";
import AddActivity from "./pages/AddActivity/AddActivity";
import Alumnes from "./pages/Alumnes/Alumnes";
import Login from "./pages/Login/Login";
import Moduls from "./pages/Moduls/Moduls";
import AddModul from "./pages/AddModul/AddModul";
import ModModul from "./pages/ModModul/ModModul";
import ModAlumne from "./pages/ModAlumne/ModAlumne";
import AddAlumne from "./pages/AddAlumne/AddAlumne";
import Registrar from "./pages/Registrar/Registrar";
import { bodyOutline, newspaperOutline } from "ionicons/icons";
import ContextProvider from "./data/ContextProvider";
import Context from "./data/context";
import UFs from "./pages/UFs/UFs";
import AddUF from "./pages/AddUF/AddUF";
import ModUF from "./pages/ModUF/ModUF";
import { AlumnesUF } from "./pages/EditarAlumnesUF/EditarAlumnesUF";

const App: React.FC = () => {
  const context = useContext(Context);
  context.ComprovarJWT(context);

  var array = context.logged
    ? [
        { id: "/alumnes", comp: "Alumnes" },
        { id: "/moduls", comp: "Moduls" },
        { id: "/ufs", comp: "UFs" },
        { id: "/logout", comp: "Logout" },
      ]
    : [
        { id: "/login", comp: "Login" },
        { id: "/registrar", comp: "Registrar" },
      ];

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId="scheduleAppM1">
          <IonHeader>
            <IonToolbar color="dark">
              <IonTitle>Projecte</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {array.map((item) => (
                <IonMenuToggle>
                  <IonItem
                    routerLink={item.id}
                    routerDirection="none"
                    lines="none"
                    color="dark"
                  >
                    <IonIcon color="medium" slot="start" icon={bodyOutline} />
                    <IonLabel>{item.comp}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              ))}
            </IonList>
          </IonContent>
        </IonMenu>
        <ContextProvider>
          <IonRouterOutlet id="scheduleAppM1">
            <Route path="/all-activities" component={AllActivities} exact />
            <Route path="/add-activity" component={AddActivity} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/registrar" component={Registrar} exact />
            <Route path="/logout" component={Login} exact />
            <Route path="/alumnes" component={Alumnes} exact />
            <Route path="/moduls" component={Moduls} exact />
            <Route path="/afegir-modul" component={AddModul} exact />
            <Route path="/mod-modul" component={ModModul} exact />
            <Route path="/mod-alumne" component={ModAlumne} exact />
            <Route path="/mod-uf" component={ModUF} exact />
            <Route path="/afegir-alumne" component={AddAlumne} exact />
            <Route path="/afegir-uf" component={AddUF} exact />
            <Route path="/ufs" component={UFs} exact />
            <Route path="/alumnes-uf" component={AlumnesUF} exact />
            <Redirect to={context.logged ? "/moduls" : "/login"} />
          </IonRouterOutlet>
        </ContextProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
