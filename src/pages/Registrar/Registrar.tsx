import React, { useContext, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonButton } from '@ionic/react';
import Context, { Persona } from '../../data/context';

export const Registrar: React.FC = () => {

  const [nom, setNom] = useState<string>();
  const [cognoms, setCognoms] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [password2, setPassword2] = useState<string>();
  const context = useContext(Context);

  var btnClick = () => {
    if (password === password2)
      context.Registrar(context, nom ?? '', cognoms ?? '', email ?? '', password ?? '');
    else context.presentAlert("Error registre", "","Les contrasenyes no coincideixen", ["OK"]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
        <IonItem>
            <IonLabel position="floating">Nom</IonLabel>
            <IonInput value={nom} onIonChange={e => setNom(e.detail.value!)} clearInput type="text"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Cognoms</IonLabel>
            <IonInput value={cognoms} onIonChange={e => setCognoms(e.detail.value!)} clearInput type="text"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)} clearInput type="email"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Contrasenya</IonLabel>
            <IonInput value={password} onIonChange={e => setPassword(e.detail.value!)} clearInput type="password"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Repetir contrasenya</IonLabel>
            <IonInput value={password2} onIonChange={e => setPassword2(e.detail.value!)} clearInput type="password"></IonInput>
          </IonItem>
        </IonList>
        <IonButton expand="block" onClick={() => btnClick() }>Registrar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Registrar;