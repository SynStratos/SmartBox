import { NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-addsb',
    templateUrl: 'addsb.html'
})

export class AddSbPage {

    id : any;
    hotel : any;
    level : any;
    room : any;

    items : any;


    constructor(private qrcode: QRScanner, public navctrl: NavController, public http: HttpClient, private http_ciao: HTTP, public alertCtrl: AlertController)
    {
        this.loadData();

    }

    async scanQrCode()
    {
        this.id = await this.qrcode.scan();
        console.log(this.id);
    }

    loadData(){

        this.http_ciao.get('http://progettoftp.altervista.org/hotel.json', {}, {})
        .then(data => {
            this.items = JSON.parse(data.data);
            /*
            //In data.data ho tutto il file json
            var prova = JSON.parse(data.data);

                let alert = this.alertCtrl.create({
                    title: 'Low battery',
                    subTitle: prova.hotel,
                    buttons: ['Dismiss']
                });
                alert.present();*/
            //console.log(data.status);
            //console.log(data.data); // data received by server
            //console.log(data.headers);


        })
        /*
        let data:Observable<any>
        data = this.http.get('http://progettoftp.altervista.org/hotel.json');
        data.subscribe(result => {
            let alert = this.alertCtrl.create({
                title: 'Low battery',
                subTitle: result,
                buttons: ['Dismiss']
              });
              alert.present();
        })*/


        /*
        let alert = this.alertCtrl.create({
            title: 'Low battery',
            subTitle: 'ilaria',
            buttons: ['Dismiss']
          });
          alert.present();
*/
    }


    sendData()
    {
        console.log(this.items.hotel);
        console.log(this.items.room);
        console.log(this.items.level);
        //funzione di upload id + hotel + level + room
    }
}

