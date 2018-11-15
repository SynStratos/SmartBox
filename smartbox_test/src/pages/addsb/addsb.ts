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
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
    selector: 'page-addsb',
    templateUrl: 'addsb.html'
})

export class AddSbPage {

    public it : any;
    public room
    public level
    public hotel
    public dog : {name: any, level: any, room: any}
    public items : {name: any, level: any, room: any} [] = []

    constructor(public alertCtrl: AlertController, public navctrl: NavController, public http: HttpClient, public http_2: HTTP)
    {
       
       this.loadData();
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
        let url = 'http://progettoftp.altervista.org/pepe.json';

        this.http_2.get(url, {}, {})
        .then(data => {
            let temp = JSON.parse(data.data);

           for(let i=0;i<temp.hotels.length;i++){
               // this.dog = {name: temp[i].hotel, level: temp[i].level, room: temp[i].room}
              //  this.items.push(this.dog);
            //    this.items[i] = {name: temp[i].hotels.name_hotel, level: temp[i].level, room: temp[i].room}
            console.log(temp.hotels[i].name_hotel)
                    }

       })        
    }

}


