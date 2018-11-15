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

    public it
    public room
    public level
    public hotel
  
    public hotels : any[] = []
    public levels : any[] = []
    public rooms : any[] = []

    public temp : any

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
        this.temp = JSON.parse(data.data);

           for(let i=0;i<this.temp.hotels.length;i++){
                this.hotels[i] = this.temp.hotels[i].name_hotel
              //  console.log(temp.hotels[i].levels[0].name_level)
                //console.log(temp.hotels[i].levels[1].name_level)

/*
                console.log(temp.hotels[i].levels[0].rooms[0].name_room)

                console.log(temp.hotels[i].levels[0].rooms[1].name_room)
                console.log(temp.hotels[i].levels[1].rooms[0].name_room)
                console.log(temp.hotels[i].levels[1].rooms[1].name_room) */
            }
            this.hotel=this.hotels[0];
            console.log(this.hotel)
            this.fillLevels();
       })

 
       
    }

    fillLevels() {
        for(let i=0; i<this.temp.hotels.length; i++){
            if(this.temp.hotels[i].name_hotel == this.hotel){
                for(let j=0; j<this.temp.hotels[i].levels.length; j++){

                    this.levels[j] = this.temp.hotels[i].levels[j].name_level
                }
                break
            }
        }
    }
/*
    fillRooms() {

        for(let i=0; i< ; i++){
            
        }
    } */
}


