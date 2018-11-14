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
import { Http, Headers} from '@angular/http';
import { stringify } from '@angular/compiler/src/util';

@Component({
    selector: 'page-addsb',
    templateUrl: 'addsb.html'
})

export class AddSbPage {

    public it : any;
    public dog : {id:any, name:any, level:any, room:any}
    public items : {id:any, name:any, level:any, room:any}[];

    constructor(public alertCtrl: AlertController, public navctrl: NavController, public http: HttpClient, public http_2: HTTP)
    {
       
       this.loadData();
        //this.data = "{ hotel: 2, level: 1, room: 4}";
       // this.items = JSON.parse(this.data);
    }
/*
    async scanQrCode()
    {
        this.id = await this.qrcode.scan();
        console.log(this.id);
    }

    setHotel(h){
        this.hotel = h;
    }
*/
    loadData() {
        let url = 'progettoftp.altervista.org/hotel_3.json';

        this.http_2.get(url, {}, {})
        .then(data => {
            let temp = JSON.parse(data.data);
            

    /*  temp.forEach(element => {
                this.dog.id = temp.id;
                this.dog.name = temp.id;
                this.dog.level = temp.id;
                this.dog.room = temp[0].id;

                this.items.push(this.dog);

            });
        */
       })        
    }

}
/*
        let alert3 = this.alertCtrl.create({
            title: stringify(this.items),
            subTitle: this.items,
            buttons: ['Dismiss']
        });
        alert3.present();
    }
*/
    /*
        data.subscribe(result)

            let alert = this.alertCtrl.create({
                title: 'Low battery',
                subTitle: this.items.hotels[0],
                buttons: ['Dismiss']
            });
            alert.present();
        }
        */
    
/*
    
    sendData()
    {
        console.log(this.items.hotel);
        console.log(this.items.room);
        console.log(this.items.level);
        //funzione di upload id + hotel + level + room
    }
    */


