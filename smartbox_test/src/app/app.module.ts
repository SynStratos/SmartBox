import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';



import { HttpClient } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { list_smartbox_page } from '../pages/list_smartbox/list_smartbox';
import { AddSbPage } from '../pages/addsb/addsb';
import {LoginPage} from "../pages/login/login";
import {LogoutPage} from "../pages/logout/logout";
import {ListNotificationsPage} from "../pages/list-notifications/list-notifications";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule} from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { NativeStorage } from '@ionic-native/native-storage';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

//notifiche push
import { Push, PushObject, PushOptions } from '@ionic-native/push';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    list_smartbox_page,
    ListNotificationsPage,
    AddSbPage,
    LoginPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    list_smartbox_page,
    ListNotificationsPage,
    AddSbPage,
    LoginPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    HttpClient,
    HTTP,
    SplashScreen,
    QRScanner,
    NativeStorage,
    AngularFireDatabase,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
