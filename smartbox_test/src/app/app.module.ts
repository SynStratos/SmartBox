import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';



import { HttpClient } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { id_operator_page } from '../pages/id_operator/id_operator';
import { AddSbPage } from '../pages/addsb/addsb';

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
import {LoginPage} from "../pages/login/login";
import {LogoutPage} from "../pages/logout/logout";
import { AngularFireDatabase } from '@angular/fire/database';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    id_operator_page,
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
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    id_operator_page,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
