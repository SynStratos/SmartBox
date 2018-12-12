webpackJsonp([0],{

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 156;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/sivlab/IdeaProjects/SmartBox/smartbox_test/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Ionic Menu Starter</h3>\n\n  <p>\n    Nocera ti amo \n  </p>\n\n  <button ion-button secondary menuToggle>Toggle Menu</button>\n</ion-content>\n'/*ion-inline-end:"/home/sivlab/IdeaProjects/SmartBox/smartbox_test/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadData();
    }
    ListPage.prototype.loadData = function () {
        var _this = this;
        var data;
        data = this.http.get('');
        data.subscribe(function (result) {
            _this.items = result;
        });
    };
    ListPage.prototype.itemTapped = function (event, item) {
        //funzione di manage
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/home/sivlab/IdeaProjects/SmartBox/smartbox_test/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n    \n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/sivlab/IdeaProjects/SmartBox/smartbox_test/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddSbPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_http__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_qr_scanner__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddSbPage = /** @class */ (function () {
    function AddSbPage(qrScanner, http) {
        this.qrScanner = qrScanner;
        this.http = http;
        this.hotels = [];
        this.levels = [];
        this.rooms = [];
        /*
        Flusso del programma:
          -Prelievo file JSON
          -se (disponibile && validato):
            -vero:
              -> Viene mostrato il bottone per scansionare QRcode + tasti indietro (TODO)
                -> QRcode non trovato -> Telecamera sempre in run
                -> QRcode trovato:
                  -> Viene mostrato:
                    -> Label con ID scansionato
                    -> Menu a tendina per scegliere hotel, piano, etc
            -falso:
              -> A video viene mostrato un file di errore "bla bla ... contattare amministratore"
         */
        this.loadData();
    }
    //Funzione prelievo dati dal server (caricamento file JSON)
    //+ validazione
    AddSbPage.prototype.loadData = function () {
        var _this = this;
        //URL del file JSON
        var url = 'http://progettoftp.altervista.org/pepe.json';
        //richiesta http
        this.http.get(url, {}, {})
            .then(function (data) {
            //validazione del file -> validazione JSON
            try {
                _this.temp = JSON.parse(data.data); //test error -> passare "b"
            }
            catch (e) {
                _this.error = "Errore nel recupero dei dati dal server.Possibili cause:\r\n\t-Mancata connessione ad internet\n\t-Formato del file scaricato dal server non corretto.\n\nCONTATTARE L'AMMINISTRATORE DI RETE.\n\n\nErrore specifico: " + e.message;
                console.log(_this.error);
                //display image error
                _this.toggle_div("display_error", "enable");
            }
            //Validation del file JSON ha avuto successo!
            console.log("Loading dei dati avvenuto con successo.");
            //mostro il pulsante per scansionare
            _this.toggle_div("show_button_qrscan", "enable");
            //validazione OK -> TODO: spostare in qr_scanner()?
            for (var i = 0; i < _this.temp.hotels.length; i++) {
                _this.hotels[i] = _this.temp.hotels[i].name_hotel;
            }
        });
    };
    //Funzione scansione QRCode
    AddSbPage.prototype.qr_scanner = function () {
        var _this = this;
        this.qrScanner.prepare()
            .then(function (status) {
            if (status.authorized) {
                //camera permission was granted
                console.log("Autorizzazione  QRCode OK!");
                /*
                Nascondo tutti i pulsanti -> fotocamera full screen
                In realtà:
                  -Al primo avvio è sufficiente solo nascondere il pulsante per il QRScan
                  -Però nascondo tutti gli altri per inglobare la casistica in cui il tasto QRScan è ripremuto dopo avere selezionato qualche hotel/piano/stanza
                  */
                _this.toggle_div("show_button_qrscan", "disable");
                _this.toggle_div("show_hotel", "disable");
                _this.toggle_div("show_level", "disable");
                _this.toggle_div("show_room", "disable");
                _this.toggle_div("show_button_send_data", "disable");
                //mostro fotocamera
                _this.qrScanner.show(); //workaround
                _this.showCamera();
                var scanSub_1 = _this.qrScanner.scan().subscribe(function (text) {
                    //nascondo fotocamera
                    scanSub_1.unsubscribe(); // stop scanning
                    _this.hideCamera(); //workaround
                    _this.toggle_div("show_button_qrscan", "enable"); //rendo nuovamente visibile il pulsante per avviare lo scan
                    //in "text" ho i dati prelevati dal qrcode -> devo gestirli
                    _this.text = text;
                    console.log('Scanned something', text);
                    _this.toggle_div("show_hotel", "enable");
                });
            }
            else if (status.denied) {
                console.log("status denied");
                // camera permission was permanently denied
                // you must use QRScanner.openSettings() method to guide the user to the settings page
                // then they can grant the permission from there
            }
            else {
                console.log("status denied temp");
                // permission was denied, but not permanently. You can ask for permission again at a later time.
            }
        })
            .catch(function (e) { return console.log('Error is', e); });
    };
    AddSbPage.prototype.send_data = function () {
        console.log("Invio dati al server");
    };
    /*------------------FUNZIONI UTILI HTML------------------*/
    /*
    Funzione che accetta 2 parametri:
      -name: nome del div da mostrare/nascondere/switchare
      -option:
        -"enable" -> mostra il div nella pagina html
        -"disable" -> nasconde il div nella pagine html
        -"toggle" -> mostra/nasconde a seconda che il div sia nascosto/mostrato
     */
    AddSbPage.prototype.toggle_div = function (name, option) {
        var html_error = document.getElementById(name);
        if (option == "toggle") {
            if (html_error.style.display === "none") {
                html_error.style.display = "block";
            }
            else {
                html_error.style.display = "none";
            }
        }
        else if (option == "enable") {
            html_error.style.display = "block";
        }
        else if (option == "disable") {
            html_error.style.display = "none";
        }
    };
    //output: in this.levels_ ho solo i "piani" relativi all'hotel specificato "name_hotel"
    AddSbPage.prototype.fillLevels = function (name_hotel) {
        this.levels = [];
        for (var i = 0; i < this.temp.hotels.length; i++) {
            if (this.temp.hotels[i].name_hotel == name_hotel) {
                for (var j = 0; j < this.temp.hotels[i].levels.length; j++) {
                    this.levels[j] = this.temp.hotels[i].levels[j]; //.name_level //ogni livello di questi (hotel con nome name_hotel) li inserisco nel vettore this.levels
                }
                break; //non ci sono due hotel con lo stesso nome
            }
        }
        this.levels_ = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.levels);
    };
    //output: in this.rooms_ ho solo le "stanze" relative al piano specificato "name_floor"
    AddSbPage.prototype.fillRooms = function (name_floor) {
        //stessa cosa della funzione fillLevels
        this.rooms = [];
        for (var i = 0; i < this.levels.length; i++) {
            if (this.levels[i].name_level == name_floor) {
                for (var j = 0; j < this.levels[i].rooms.length; j++) {
                    this.rooms[j] = this.levels[i].rooms[j].name_room;
                }
                break;
            }
        }
        this.rooms_ = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.rooms); //rooms_ diventa "osservatore" di this.rooms -> Quindi ogni volta che cambia "rooms" cambia "room_s"
    };
    /*------------------FUNZIONI WORKAROUND------------------*/
    /*
  -https://forum.ionicframework.com/t/qr-scanner-seems-to-be-working-in-the-background-but-doesnt-display-a-preview-when-calling-show/99822/6
  -(altro possibile workaround: https://github.com/ionic-team/ionic-native/issues/1812)
  -workaround -> Metodo show() ufficiale non funziona
  -qrScanner.show() non elimina lo sfondo dell'app e quindi tutto viene avviato senza errori ma il qrscanner è in run "sotto" l'applicazione
  -questo workaround non fa altro che settare lo sfondo dell'app trasparente (showCamera()) e lo ripristina (hideCamera())
  -Tecnicamente aggiungono e rimuovo una classe CSS che setta/rimuove lo sfondo a trasparente
  */
    AddSbPage.prototype.showCamera = function () {
        window.document.querySelector('ion-app').classList.add('cameraView');
    };
    AddSbPage.prototype.hideCamera = function () {
        window.document.querySelector('ion-app').classList.remove('cameraView');
    };
    AddSbPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addsb',template:/*ion-inline-start:"/home/sivlab/IdeaProjects/SmartBox/smartbox_test/src/pages/addsb/addsb.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <h1>CENSIMENTO SMARTBOX</h1>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="background: none transparent;">\n\n  <!-- Div contenente il possibile errore in fase di parsing -->\n  <div id="display_error" style="display: none;">\n    <img src="../../assets/imgs/error.png" width="100" height="100">\n    <br>\n    {{error}}\n  </div>\n\n\n  <!--\n    Pagina principale che consta di:\n      -Pulsante per avviare la scansione QRCode\n      -Menu tendina per gli hotel\n      -Menu tendina per i piani del relativo hotel\n      -Menu tendina per le stanze del relativo piano\n      -Pulsante per inviare i dati al server = dato prelevato dal QRCode + dati su hotel, piano, stanza\n  -->\n  <div id="show_button_qrscan" style="display: none;" text-center="">\n    <button ion-button (click)="qr_scanner()">Scan for QRCode</button>\n  </div>\n\n  <div id="show_hotel" style="display: none;">\n    <ion-item>\n      <ion-label>Hotel</ion-label>\n      <ion-select [(ngModel)]="hotel">\n        <ion-option *ngFor="let item of hotels" [value]="item"\n                    (ionSelect)="fillLevels(item); toggle_div(\'show_level\',\'enable\')">{{item}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </div>\n\n\n  <div id="show_level" style="display: none;">\n    <div *ngIf="levels_ | async; else loading; let livelli">\n      <ion-item>\n        <ion-label>Level</ion-label>\n        <ion-select [(ngModel)]="level">\n          <ion-option *ngFor="let item of livelli" [value]="item.name_level"\n                      (ionSelect)="fillRooms(item.name_level); toggle_div(\'show_room\',\'enable\')">{{item.name_level}}</ion-option>\n        </ion-select>\n      </ion-item>\n    </div>\n  </div>\n\n\n  <div id="show_room" style="display: none;">\n    <div *ngIf="rooms_ | async; else loading; let camere">\n      <ion-item>\n        <ion-label>Room</ion-label>\n        <ion-select [(ngModel)]="room">\n          <ion-option *ngFor="let item of camere" [value]="item"\n                      (ionSelect)="toggle_div(\'show_button_send_data\',\'enable\')">{{item}}</ion-option>\n        </ion-select>\n      </ion-item>\n    </div>\n  </div>\n\n\n  <div id="show_button_send_data" style="display: none;" text-center="">\n    <button ion-button (click)="send_data()">Send data to server</button>\n  </div>\n\n\n  <ng-template #loading>\n    Loading...\n  </ng-template>\n\n</ion-content>\n\n'/*ion-inline-end:"/home/sivlab/IdeaProjects/SmartBox/smartbox_test/src/pages/addsb/addsb.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_qr_scanner__["a" /* QRScanner */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_http__["a" /* HTTP */]])
    ], AddSbPage);
    return AddSbPage;
}());

//# sourceMappingURL=addsb.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_qr_scanner__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_addsb_addsb__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_http__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_addsb_addsb__["a" /* AddSbPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_addsb_addsb__["a" /* AddSbPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_0__ionic_native_qr_scanner__["a" /* QRScanner */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_addsb_addsb__ = __webpack_require__(201);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Add SB', component: __WEBPACK_IMPORTED_MODULE_6__pages_addsb_addsb__["a" /* AddSbPage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/sivlab/IdeaProjects/SmartBox/smartbox_test/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content padding>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/sivlab/IdeaProjects/SmartBox/smartbox_test/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map