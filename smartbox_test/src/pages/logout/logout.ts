import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController) {
    this.logout();
  }

  logout(){

    /*
    il logout dell'utente non fa che:
      -settare la rootpage = loginpage
      -e da questa pagina (vedi relativo codice) non si può andare da nessuna parte se non ci si autentica
     */
    this.navCtrl.setRoot(LoginPage); //setto la rootPage
    this.navCtrl.popToRoot(); //vado alla rootPage (appena settata)
  }

}
