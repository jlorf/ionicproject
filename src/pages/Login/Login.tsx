import React, { useContext, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonButton } from '@ionic/react';
import ActivitiesContext, { Persona } from '../../data/activities-context';

export const Login: React.FC = () => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const activitiesCtxt = useContext(ActivitiesContext);

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
        </IonList>
        <IonButton expand="block" onClick={() => activitiesCtxt.Login(email ?? '', password ?? '')}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;