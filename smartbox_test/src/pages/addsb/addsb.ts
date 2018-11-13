import { NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Component } from '@angular/core';
import { Toast } from '@ionic-native/toast';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';

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


    constructor(private qrcode: QRScanner, public navctrl: NavController, public http: HttpClient, private http_ciao: HTTP)
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

            console.log(data.status);
            console.log(data.data); // data received by server
            console.log(data.headers);
        
          })

        /*
        console.log('Favorite clicked');
        let data:Observable<any>;
        data = this.http.get('progettoftp.altervista.org/hotel.json');
        console.log("bambolinastupro");
        data.subscribe(result => {
            console.log("***");
            console.log(result);
            this.items = result;
            //alessabdra grimaldi
            //noemi maggi
            //giorgia sparani
        })*/
    }


    sendData()
    {
        console.log(this.items.hotel);
        console.log(this.items.room);
        console.log(this.items.level);
        //funzione di upload id + hotel + level + room
    }
}

