import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  //icons: string[];
  //items: Array<{title: string, note: string, icon: string}>;

  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: HttpClient) {
    this.loadData();
  }

  loadData(){
    let data:Observable<any>;
    data = this.http.get('');
    data.subscribe(result => {
        this.items = result;
    })
}

  itemTapped(event, item) {
    //funzione di manage
  }
}
