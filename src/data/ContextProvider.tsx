import React, { useState, useContext } from 'react';
import * as $ from 'jquery'
import ActivitiesContext, { Activity, ContextModel, ActivityType, Persona, LoginReturn, Modul, Validar } from './context';

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

    const ObtenirPersones = (ctx: ContextModel, professor: boolean) => {
        var persones = Array<Persona>();
        $.ajax({
            method: "GET",
            url: ctx.urlapi + "/Api/persona/json.php?professor=" + (professor ? 1 : 0),
            data: {jwt: ctx.jwt}
        })
            .done(function(res) {
                //console.log(jwt);
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
                    ctx.professors = persones;
                  } else {
                    ctx.alumnes = persones;
                  }
            });
    };

    const ObtenirModuls = (ctx: ContextModel) => {
        var moduls = Array<Modul>();
        $.ajax({
            method: "GET",
            url: ctx.urlapi + "/Api/modul/api.php",
            data: {jwt: ctx.jwt}
        })
            .done(function(res) {
                //console.log(jwt);
                $.each(res.records, function(i, item : Modul) {
                    moduls.push({
                        codi: item.codi,
                        Nom: item.Nom,
                        Abrev: item.Abrev
                    })
                  });
                ctx.moduls = moduls;
            });
    };

    const Login = (ctx: ContextModel, email: string, password: string) => {
        $.ajax({
            method: "POST",
            url: ctx.urlapi + "/JWT/login.php",
            data: { email: email, password: password },
            error: function (request, status, error) {
                setLogged(false);
                presentAlert('Login', 'Error', request.responseText, ['Ok']);
            }
        })
            .done(function(res: LoginReturn) {
                if (res.jwt){
                    presentAlert('Login', 'Correcte', res.message, ['Ok']);
                    //activitiesContext.jwt = res.jwt;
                    ctx.logged = true;
                    ctx.jwt = res.jwt;
                    globalThis.localStorage.setItem('JWT', res.jwt);
                    window.location.replace('moduls');
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
      

    const Registrar = (ctx: ContextModel, nom: string, cognom: string, email: string, password: string) => {
        $.ajax({
            method: "POST",
            url: ctx.urlapi + "/JWT/create_user.php",
            data: { firstname: nom, lastname: cognom, email: email, password: password },
            error: function (request, status, error) {
                presentAlert('Registre', 'Error', request.responseText, ['Ok']);
            }
        })
            .done(function(res: LoginReturn) {
                ctx.presentAlert("Registre", "", res.message, ["OK"]);
                window.location.replace('login');
            });
    };

    const [professors, setProfessors] = useState<Persona[]>([]);

    const [alumnes, setAlumnes] = useState<Persona[]>([]);

    const [moduls, setModuls] = useState<Modul[]>([]);

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



    const ComprovarJWT = () => {
        var item = globalThis.localStorage.getItem("JWT");
        setJWT(item ?? '');
        var res = $.ajax({
            method: "POST",
            url: "http://192.168.2.212/ProjecteGit/JWT/validate_token.php",
            data: { jwt: jwt },
            async: false
        }).responseText;
        debugger;
        if (res != null && res != undefined){
        var resJSON = JSON.parse(res);
            // .done(function(res: Validar) {
            if (resJSON?.message == "Access granted." && resJSON?.data != null){
                //activitiesContext.jwt = res.jwt;
                setLogged(true);
                setJWT(item ?? '');
            } else {
                setLogged(false);
            }
        } else {
            setLogged(false);
        }
        return logged;
    };

    const [jwt, setJWT] = useState<string>('');

    const [logged, setLogged] = useState<boolean>(false);

    const activitiesContext: ContextModel = {
        activities,
        addActivity,
        completeActivity,
        alumnes,
        professors,
        ObtenirPersones,
        jwt: globalThis.localStorage.getItem("JWT") ?? '',
        urlapi: 'http://192.168.2.212/ProjecteGit',
        logged: false,
        Login,
        Registrar,
        presentAlert,
        moduls,
        ObtenirModuls,
        ComprovarJWT
    };

    return (
        <ActivitiesContext.Provider value={activitiesContext}>
            {props.children}
        </ActivitiesContext.Provider>
    );
};

export default ContextProvider;