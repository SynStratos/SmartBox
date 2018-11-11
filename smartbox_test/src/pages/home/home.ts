import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private androidPermissions: AndroidPermissions, public navCtrl: NavController) {


    this.androidPermissions.checkPermissions()

  }

}
