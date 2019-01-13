import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController} from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {HomePage} from "../home/home";
import { NativeStorage } from '@ionic-native/native-storage'; //memorizzazione dati storage permanente (es. email = id_operatore)

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  public email_operator;
  public password_operator;

  constructor(public afAuth: AngularFireAuth, private alertCtrl: AlertController, public menuCtrl: MenuController, public navCtrl: NavController, private nativeStorage: NativeStorage) {

    //Disattivo il menu laterale! -> Se l'utente non si autentica non si deve poter fare nulla!
    this.menuCtrl.enable(false, 'side_menu');

  }

  login() {

    //Validazione email -> RFC
    if(this.validation_email(this.email_operator)){

      //Interfacciamento al sistema di autenticazione di Firebase (email, password)
      this.afAuth.auth.signInWithEmailAndPassword(this.email_operator,this.password_operator)
        .then(
          () => {
            console.log("Autenticazione OK");
            this.alert("Autenticazione", "Autenticazione avvenuta con successo!", "Ok");

            //memorizzo nello storage (nativo) l'email dell'operatore (id_operator) -> mi serve perchè lo memorizzo nel database insieme alla smartbox censita
            this.nativeStorage.setItem('id_operator',this.email_operator)
              .then(
                () => {
                  //Dato memorizzato con successo
                  console.log("Dato id_operator memorizzato con successo"); //debug

                  //Riattivo il menu laterale! Login avvenuto con successo!
                  this.menuCtrl.enable(true, 'side_menu');
                  this.navCtrl.setRoot(HomePage); //setto la rootPage
                  this.navCtrl.popToRoot(); //vado alla rootPage (appena settata)

                },
                error => {
                  //Dato non memorizzato con successo
                  console.error("Errore nel prelevare il dato: "+ error.toString()); //debug
                  this.alert("Errore", "Impossibile accedere allo storage del dispositivo. Contattare l'amministratore di sistema.", "Ok");
                }
              )

          },
          error => {
            this.alert("Errore di autenticazione: ", error, "Riprova");
            console.error("Errore di autenticazione: " + error);
          }
        )
    }
    else{
      this.alert("Errore Email", "Il formato dell'email non è corretto. \n(RFC 5322)", "Riprova")
    }


  }

  validation_email(email){

    //General Email Regex (RFC 5322 Official Standard)
    var regexp_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(regexp_email.exec(email)){

      //email formattata bene
      return true;
    }
    else{
      return false;
    }
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
