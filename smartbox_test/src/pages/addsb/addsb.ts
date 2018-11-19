import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {HTTP} from '@ionic-native/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';


@Component({
selector: 'page-addsb',
templateUrl: 'addsb.html'
})

export class AddSbPage {

    public show_level = false;
    public show_room = false;

    public it
    public id
    public room
    public level
    public hotel

    public hotels: any[] = []
    public levels: any[] = []
    public rooms: any[] = []

    public temp: any

    public levels_: Observable < any[] >

    public rooms_: Observable < any[] >


    constructor(public qrScanner: QRScanner, public navctrl: NavController, public http: HTTP) {
        this.loadData();
        console.log("ciao");
      //  this.qr_scanner();
       
        console.log("ciao1");

        
    }

    qr_scanner(){
        
        this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
            if (status.authorized) {
            // camera permission was granted
            console.log("permessi ok");
            window.document.querySelector('ion-app').classList.add('transparentBody');
            
            this.qrScanner.useFrontCamera();
            this.qrScanner.show();
            // start scanning
            let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                console.log('Scanned something', text);
                this.id = text;
                this.qrScanner.hide(); // hide camera preview
                scanSub.unsubscribe(); // stop scanning

            });

            } else if (status.denied) {
                console.log("status denied");
            // camera permission was permanently denied
            // you must use QRScanner.openSettings() method to guide the user to the settings page
            // then they can grant the permission from there
            } else {

                console.log("status denied temp");
            // permission was denied, but not permanently. You can ask for permission again at a later time.
            }
        })
        .catch((e: any) => console.log('Error is', e));
    }

    //Funzioni utili per la visualizzazione
    show_levels() {
        this.show_level = true;
    }

    show_rooms() {
        this.show_room = true;
    }


    loadData() {
        let url = 'http://progettoftp.altervista.org/pepe.json';

        this.http.get(url, {}, {})
        .then(data => {
        this.temp = JSON.parse(data.data);

        for (let i = 0; i < this.temp.hotels.length; i++) {
        this.hotels[i] = this.temp.hotels[i].name_hotel
        }
        })
    }

    fillLevels(luca) {
        this.levels = []
        for (let i = 0; i < this.temp.hotels.length; i++) {
        if (this.temp.hotels[i].name_hotel == luca) {
        for (let j = 0; j < this.temp.hotels[i].levels.length; j++) {

        this.levels[j] = this.temp.hotels[i].levels[j] //.name_level
        }
        break
        }
        }
        this.levels_ = Observable.of(this.levels)
    }

    fillRooms(dio) {
        this.rooms = []
        for (let i = 0; i < this.levels.length; i++) {
        if (this.levels[i].name_level == dio) {
        for (let j = 0; j < this.levels[i].rooms.length; j++) {

        this.rooms[j] = this.levels[i].rooms[j].name_room
        }
        break
        }
        }
        this.rooms_ = Observable.of(this.rooms)
    }

}