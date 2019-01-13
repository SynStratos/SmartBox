import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import {Observable} from "rxjs";
import { of } from 'rxjs';
import {NativeStorage} from "@ionic-native/native-storage";


@Component({
  selector: 'page-list-notifications',
  templateUrl: 'list-notifications.html',
})
export class ListNotificationsPage {

  public notifications_: Observable<any>;
  public notifications : Observable<any>;
  public notifi_list = [];

  constructor(private alertCtrl: AlertController, private nativeStorage: NativeStorage) {
    this.get_notifications();
  }

  get_notifications(){

    //prelevo tutte le chiavi
    this.nativeStorage.keys().then(data => {

      //seleziono solo le chiavi che iniziano per "notification_"
      //  -> Sono le notifiche
      //  -> le altre sono dati del sistema che in questo caso non mi interessano
      //TODO: in questo caso un db relazione avrebbe aiutato -> Problemi plugin Ionic di cross dipendenza
      for (let dataKey in data) {

        //in data[dataKey] ho il NOME della chiave
        //seleziono solo le chiavi che iniziano per "notification_"
        if(data[dataKey].startsWith("notification_")){

          //qui ho le chiavi selezionate
          //ora devo riaccedere allo storage e prelevare i dati relativi a tale chiave
          this.nativeStorage.getItem(data[dataKey]).then(messaggio => {

            //il messaggiodi notifica è salvato in questo formato (vedi app.components.ts):
            // titolo | messaggio
            // devo quindi separare i due e sostituire il carattere "|" con "\n"
            //TODO: in realtà questo sistema fallisce nel momento in cui nel titolo o messaggio della notifica ci sia un carattere "|"
            this.notifi_list.push(messaggio.replace(/\|/g, "\n"));
          })

        }
      }

      this.notifications_ = of(this.notifi_list);

    });

  }

  erase_notifications(){

    this.nativeStorage.keys().then(data => {

      //seleziono solo le chiavi che iniziano per "notification_" -> Sono le notifiche -> le altre sono dati del sistema che in questo caso non mi interessano
      for (let dataKey in data) {

        //in data[dataKey] ho il NOME della chiave
        //seleziono solo le chiavi che iniziano per "notification_"
        if(data[dataKey].startsWith("notification_")){

          //qui ho le chiavi selezionate
          //ora devo cancellarle
          this.nativeStorage.remove(data[dataKey]);

          //avviso utente
          this.alert("Notifiche", "Notifiche cancellate con successo.\nSi prega ri ricaricare la pagina.","Ok")
        }
      }
    });

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
