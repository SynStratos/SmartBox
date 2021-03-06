import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import {Observable} from "rxjs";
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';



@Component({
  selector: 'page-list',
  templateUrl: 'list_smartbox.html'
})

export class list_smartbox_page {

  public smartboxes_: Observable<any>;
  public smartboxes : Observable<any>;
  public smart_list = [];

  constructor(private alertCtrl: AlertController, public db: AngularFireDatabase) {
    this.get_smartboxes();
  }

  get_smartboxes(){

    //Interfacciamento a Firebase Realtime Database
    this.smartboxes_ = this.db.object('smartbox_censite').valueChanges();
    this.smartboxes_.subscribe(data => {

      //in questo punto ho tutti i dati prelevati da firebase storage
      //bisogna iterare l'itero JSON tree su ogni chiave
      //inserisco ogni smartbox censita nella variabile smart_list
      Object.keys(data).forEach(key => {
        var string = 'Time: '+key+'\nId Smartbox: '+data[key].id_smartbox+'\nId Operator: '+data[key].id_operator+'\nHotel: '+data[key].hotel+'\nFloor: '+data[key].level+'\nRoom: '+data[key].room;
        this.smart_list.push(string);
      });

      this.smartboxes = of(this.smart_list);
    })
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
