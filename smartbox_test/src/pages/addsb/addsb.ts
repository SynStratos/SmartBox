import { NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Component } from '@angular/core';
import { Toast } from '@ionic-native/toast';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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


    constructor(private qrcode: QRScanner, public navctrl: NavController, public http: HttpClient)
    {
        this.loadData();

    }

    async scanQrCode()
    {
        this.id = await this.qrcode.scan();
        console.log(this.id);
    }

    loadData(){
        let data:Observable<any>;
        data = this.http.get('http://www.google.it');
        data.subscribe(result => {
            this.items = result;
        })
    }

    sendData()
    {
        //funzione di upload id + hotel + level + room
    }
}

