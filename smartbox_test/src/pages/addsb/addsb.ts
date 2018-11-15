import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

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

    public levels_: Observable<any[]>

    public rooms_: Observable<any[]>

    constructor(public navctrl: NavController, public http: HTTP)
    {
       this.loadData();
    }

    


    loadData() {
        let url = 'http://progettoftp.altervista.org/pepe.json';

        this.http.get(url, {}, {})
        .then(data => {
        this.temp = JSON.parse(data.data);

           for(let i=0;i<this.temp.hotels.length;i++){
                this.hotels[i] = this.temp.hotels[i].name_hotel
            }
       })    
}

fillLevels(luca) {
    this.levels = []
    for(let i=0; i<this.temp.hotels.length; i++){
        if(this.temp.hotels[i].name_hotel == luca){
            for(let j=0; j<this.temp.hotels[i].levels.length; j++){

                this.levels[j] = this.temp.hotels[i].levels[j] //.name_level
            }
            break
        }
    }
    this.levels_ = Observable.of(this.levels)
}

fillRooms(dio) {
    this.rooms = []
    for(let i=0; i<this.levels.length; i++){
        if(this.levels[i].name_level == dio){
            for(let j=0; j<this.levels[i].rooms.length; j++){

                this.rooms[j] = this.levels[i].rooms[j].name_room
            }
            break
        }
    }
    this.rooms_ = Observable.of(this.rooms)
}




}


