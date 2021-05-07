import React, { useState } from 'react';
import * as $ from 'jquery'
import ActivitiesContext, { Activity, ContextModel, ActivityType, Persona, LoginReturn } from './context';

const ContextProvider: React.FC = (props) => {

    const [activities, setActivities] = useState<Activity[]>([
        {
            id: Math.random().toString(),
            title: 'My daily sleep',
            description: 'Sleep through the night after a day of quarantine',
            hour: '23:00',
            activityType: 'rest',
            imageUrl: '/assets/images/rest.jpg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Hard work',
            description: 'Work in the projects I have at Tribalyte',
            hour: '9:00',
            activityType: 'work',
            imageUrl: '/assets/images/work.jpg',
            isCompleted: false
        },
        {
            id: Math.random().toString(),
            title: 'Play ping pong',
            description: 'Play a ping pong match on the hall table!',
            hour: '19:00',
            activityType: 'hobby',
            imageUrl: '/assets/images/hobby.jpg',
            isCompleted: false
        }
    ]);

    const ObtenirPersones = (professor: boolean) => {
        var persones = Array<Persona>();
        $.ajax({
            method: "GET",
            url: "http://192.168.2.212/ProjecteGit/Api/persona/json.php?professor=" + (professor ? 1 : 0),
            data: {jwt: jwt}
        })
            .done(function(res) {
                $.each(res.records, function(i, item : Persona) {
                    persones.push({
                        codi: item.codi,
                        Nom: item.Nom,
                        Cognoms: item.Cognoms,
                        professor: item.professor
                    })
                  });
                  if (professor)
                  {
                    setProfessors(currProfessors => {
                        return persones;
                    });
                  } else {
                    setAlumnes(currProfessors => {
                        return persones;
                      });
                  }
            });
    };

    const Login = (email: string, password: string) => {
        $.ajax({
            method: "POST",
            url: "http://192.168.2.212/ProjecteGit/JWT/login.php",
            data: { email: email, password: password },
            error: function (request, status, error) {
                
                presentAlert('Login', 'Error', request.responseText, ['Ok']);
            }
        })
            .done(function(res: LoginReturn) {
                if (res.jwt){
                    presentAlert('Login', 'Correcte', res.message, ['Ok']);
                    activitiesContext.jwt = res.jwt;
                }
            });
    };

    const presentAlert = async function(titol: string, subtitol: string, text: string, buttons: string[]) {
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'my-custom-class';
        alert.header = titol;
        alert.subHeader = subtitol;
        alert.message = text;
        alert.buttons = buttons;
      
        document.body.appendChild(alert);
        await alert.present();
      
        const { role } = await alert.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
      }
      

    const Registrar = (nom: string, cognom: string, email: string, password: string) => {
        $.ajax({
            method: "POST",
            url: "http://192.168.2.212/ProjecteGit/JWT/create_user.php",
            data: { firstname: nom, lastname: cognom, email: email, password: password }
        })
            .done(function(res: LoginReturn) {
                if (res.jwt){

                }
            });
    };

    const [professors, setProfessors] = useState<Persona[]>([]);

    const [alumnes, setAlumnes] = useState<Persona[]>([]);

    const addActivity = (title: string, description: string, activityType: ActivityType) => {
        let imageUrl = '';
        switch(activityType) {
            case 'rest':
                imageUrl = '/assets/images/rest.jpg'
                break;
            case 'hobby':
                imageUrl = '/assets/images/hobby.jpg'
                break;
            case 'work':
                imageUrl = '/assets/images/work.jpg'
                break;
            default:
                imageUrl = '/assets/images/work.jpg'
                break;
        };

        const activityDate = new Date();
        const hour = activityDate.getHours() + ':' + activityDate.getMinutes();

        const addActivity: Activity = {
            id: Math.random().toString(),
            title,
            description,
            hour,
            activityType,
            imageUrl,
            isCompleted: false
        };

        setActivities(currActivities => {
            return [...currActivities, addActivity]
        })
    };

    const completeActivity = (activityId: string) => {
        setActivities(currActivities => {
            const updatedActivities = [...currActivities];
            const selectedActivityIndex = activities.findIndex(act => act.id === activityId);
            const updatedActivity = {...updatedActivities[selectedActivityIndex], isCompleted: true};
            updatedActivities[selectedActivityIndex] = updatedActivity;
            return updatedActivities;
        });
    };

    const jwt = '';

    const activitiesContext: ContextModel = {
        activities,
        addActivity,
        completeActivity,
        alumnes,
        professors,
        ObtenirPersones,
        jwt,
        Login,
        Registrar,
        presentAlert
    };

    return (
        <ActivitiesContext.Provider value={activitiesContext}>
            {props.children}
        </ActivitiesContext.Provider>
    );
};

export default ContextProvider;