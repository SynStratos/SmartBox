import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  public email_operator;
  public password_operator;

  constructor(public afAuth: AngularFireAuth, private alertCtrl: AlertController) {}

  login() {

    if(this.validation_email(this.email_operator)){

      this.afAuth.auth.signInWithEmailAndPassword(this.email_operator,this.password_operator)
        .then(
          () => console.log("Autenticazione OK"),
          error => {
            this.alert("Errore di autenticazione: ", error);
            console.error("Errore di autenticazione: " + error);
          }
        )

    }
    else{
      this.alert("Errore Email", "Il formato dell'email non è corretto. \n(RFC 5322)")
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

  alert(titolo, sottotitolo){
    let alert = this.alertCtrl.create({
      title: titolo,
      subTitle: sottotitolo,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
