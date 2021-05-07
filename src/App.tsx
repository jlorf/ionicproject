import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AllActivities from './pages/AllActivities/AllActivities';
import AddActivity from './pages/AddActivity/AddActivity';
import Alumnes from './pages/Alumnes/Alumnes';
import Login from './pages/Login/Login';
import { bodyOutline, newspaperOutline } from 'ionicons/icons';
import ContextProvider from './data/ContextProvider';

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonMenu contentId='scheduleAppM1'>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Schedule App</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonMenuToggle>
                            <IonItem routerLink="/all-activities" routerDirection="none" lines="none">
                                <IonIcon color="medium" slot="start" icon={bodyOutline}/>
                                <IonLabel>All activities</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem routerLink="/add-activity" routerDirection="none" lines="none">
                                <IonIcon color="medium" slot="start" icon={newspaperOutline}/>
                                <IonLabel>Add activity</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem routerLink="/login" routerDirection="none" lines="none">
                                <IonIcon color="medium" slot="start" icon={bodyOutline}/>
                                <IonLabel>Login</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem routerLink="/alumnes" routerDirection="none" lines="none">
                                <IonIcon color="medium" slot="start" icon={bodyOutline}/>
                                <IonLabel>Alumnes</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>
            <ContextProvider>
                <IonRouterOutlet id="scheduleAppM1">
                    <Route path='/all-activities' component={AllActivities} exact />
                    <Route path='/add-activity' component={AddActivity} exact />
                    <Route path='/login' component={Login} exact />
                    <Route path='/alumnes' component={Alumnes} exact />
                    <Redirect to='/all-activities' />
                </IonRouterOutlet>
            </ContextProvider>
        </IonReactRouter>
    </IonApp>
);

export default App;
