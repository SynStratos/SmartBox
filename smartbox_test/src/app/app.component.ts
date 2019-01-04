import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { list_smartbox_page } from '../pages/list_smartbox/list_smartbox';
import { AddSbPage } from '../pages/addsb/addsb'
import { LoginPage } from '../pages/login/login'
import { LogoutPage } from '../pages/logout/logout'
import { ListNotificationsPage } from "../pages/list-notifications/list-notifications";
import { AlertController } from 'ionic-angular';

//notifiche push
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { NativeStorage } from '@ionic-native/native-storage';



@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //La pagina root deve essere quella del login, infatti l'utente, finchè non si autentica, non deve poter accedere a null'altro
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private push: Push, private nativeStorage: NativeStorage, private alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Add Smartbox', component: AddSbPage },
      { title: 'List Smartbox', component: list_smartbox_page },
      { title: 'List Notifications', component: ListNotificationsPage},
      { title: 'Logout', component: LogoutPage }
    ];

    this.pushSetup();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }


  //Richiamata da pagina html -> Quando nel menu si clicca su una possibile pagina
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component == HomePage){
      //se non ci fosse if-else e solo questo comando, non si potrebbe usare il pulsante "back"
      this.nav.setRoot(HomePage);
    } else {
      this.nav.push(page.component);
    }
  }

  pushSetup(){

    const options: PushOptions = {
      android: {
        senderID : '593512003507',
        sound: true,
        vibrate: true,
        forceShow: true
      }
    };


    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => {

        console.log('Received a notification', notification);

        //memorizzo la notifica nello storage
        this.nativeStorage.setItem('notification_'+Date.now(), "Titolo:"+notification.title+"|"+"Messaggio:"+notification.message)
          .then(
            () => {
              //Dato memorizzato con successo
              console.log("Notifica memorizzata con successo");
            }
          );

        //alert all'utente con il contenuto della notifica
        this.alert("Notifica: "+notification.title, notification.message+"<br/>La notifica può essere riletta nella sezione list notifications", "Ok")


    });

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  alert(titolo, sottotitolo, button){
    let alert = this.alertCtrl.create({
      title: titolo,
      subTitle: sottotitolo,
      buttons: [button]
    });
    alert.present();
  }

}
