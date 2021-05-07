import React, { useContext, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonButton } from '@ionic/react';
import Context, { Persona } from '../../data/context';

export const Registrar: React.FC = () => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [password2, setPassword2] = useState<string>();
  const context = useContext(Context);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
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
        <IonButton expand="block" onClick={() => context.Login(email ?? '', password ?? '')}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Registrar;