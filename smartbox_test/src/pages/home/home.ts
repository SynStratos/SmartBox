import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public afAuth: AngularFireAuth) {
    this.login();

  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword("operatore123@smartbox.it","126")
      .then(
        () => console.log("OKVAFFANCULO"),
        error => console.error('Error storing item', error)
      )
  }

}
