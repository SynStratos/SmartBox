import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AddSbPage} from "../addsb/addsb";
import {list_smartbox_page} from "../list_smartbox/list_smartbox";
import {ListNotificationsPage} from "../list-notifications/list-notifications";
import {LogoutPage} from "../logout/logout";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public add_sb = { title: 'Add Smartbox', component: AddSbPage };
  public list_sb = { title: 'List Smartbox', component: list_smartbox_page };
  public list_no = { title: 'List Notifications', component: ListNotificationsPage};
  public logout = { title: 'Logout', component: LogoutPage };

  constructor(public navCtrl: NavController) {

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component == HomePage){
      //se non ci fosse if-else e solo questo comando, non si potrebbe usare il pulsante "back"
      this.navCtrl.setRoot(HomePage);
    } else {
      this.navCtrl.push(page.component);
    }
  }

}
