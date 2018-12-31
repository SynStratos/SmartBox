webpackJsonp([1],{

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function HomePage() {
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/sivlab/github/Smartbox/smartbox_test/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>HOME</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <h3>Ionic Menu Starter</h3>\n  <button ion-button secondary menuToggle>Toggle Menu</button>\n</ion-content>\n'/*ion-inline-end:"/home/sivlab/github/Smartbox/smartbox_test/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





 //memorizzazione dati storage permanente (es. email = id_operatore)
var LoginPage = /** @class */ (function () {
    function LoginPage(afAuth, alertCtrl, menuCtrl, navCtrl, nativeStorage) {
        this.afAuth = afAuth;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.nativeStorage = nativeStorage;
        //Disattivo il menu laterale! -> Se l'utente non si autentica non si deve poter fare nulla!
        this.menuCtrl.enable(false, 'side_menu');
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.validation_email(this.email_operator)) {
            this.afAuth.auth.signInWithEmailAndPassword(this.email_operator, this.password_operator)
                .then(function () {
                console.log("Autenticazione OK");
                _this.alert("Autenticazione", "Autenticazione avvenuta con successo!", "Ok");
                //memorizzo nello storage (nativo) l'email dell'operatore (id_operator) -> mi serve perchè lo memorizzo nel database insieme alla smartbox censita
                _this.nativeStorage.setItem('id_operator', _this.email_operator)
                    .then(function () {
                    //Dato memorizzato con successo
                    console.log("Dato id_operator memorizzato con successo"); //debug
                    //Riattivo il menu laterale! Login avvenuto con successo!
                    _this.menuCtrl.enable(true, 'side_menu');
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]); //setto la rootPage
                    _this.navCtrl.popToRoot(); //vado alla rootPage (appena settata)
                }, function (error) {
                    //Dato non memorizzato con successo
                    console.error("Errore nel prelevare il dato: " + error.toString()); //debug
                    _this.alert("Errore", "Impossibile accedere allo storage del dispositivo. Contattare l'amministratore di sistema.", "Ok");
                });
            }, function (error) {
                _this.alert("Errore di autenticazione: ", error, "Riprova");
                console.error("Errore di autenticazione: " + error);
            });
        }
        else {
            this.alert("Errore Email", "Il formato dell'email non è corretto. \n(RFC 5322)", "Riprova");
        }
    };
    LoginPage.prototype.validation_email = function (email) {
        //General Email Regex (RFC 5322 Official Standard)
        var regexp_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexp_email.exec(email)) {
            //email formattata bene
            return true;
        }
        else {
            return false;
        }
    };
    LoginPage.prototype.alert = function (titolo, sottotitolo, button) {
        var alert = this.alertCtrl.create({
            title: titolo,
            subTitle: sottotitolo,
            buttons: [button]
        });
        alert.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/sivlab/github/Smartbox/smartbox_test/src/pages/login/login.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n    <ion-item text-center="">\n      <ion-label color="primary">Email:</ion-label>\n      <ion-input [(ngModel)]="email_operator" type="email" placeholder="Email/Username"></ion-input>\n    </ion-item>\n\n    <ion-item text-center="">\n      <ion-label color="primary">Password:</ion-label>\n      <ion-input [(ngModel)]="password_operator" type="password" placeholder="Password"></ion-input>\n    </ion-item>\n\n    <ion-item text-center="">\n      <button ion-button (click)="login()">LOGIN</button>\n    </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/home/sivlab/github/Smartbox/smartbox_test/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_fire_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 198:
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
webpackEmptyAsyncContext.id = 198;

/***/ }),

/***/ 242:
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
webpackEmptyAsyncContext.id = 242;

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return list_smartbox_page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var list_smartbox_page = /** @class */ (function () {
    function list_smartbox_page(alertCtrl, db) {
        this.alertCtrl = alertCtrl;
        this.db = db;
        this.smart_list = [];
        this.get_smartboxes();
    }
    list_smartbox_page.prototype.get_smartboxes = function () {
        var _this = this;
        this.smartboxes_ = this.db.object('smartbox_censite').valueChanges();
        this.smartboxes_.subscribe(function (data) {
            //in questo punto ho tutti i dati prelevati da firebase storage
            //bisogna iterare l'itero JSON tree su ogni chiave
            Object.keys(data).forEach(function (key) {
                var string = 'Time: ' + key + '\nId Smartbox: ' + data[key].id_smartbox + '\nId Operator: ' + data[key].id_operator + '\nHotel: ' + data[key].hotel + '\nFloor: ' + data[key].level + '\nRoom: ' + data[key].room;
                _this.smart_list.push(string);
            });
            _this.smartboxes = Object(__WEBPACK_IMPORTED_MODULE_3_rxjs__["of"])(_this.smart_list);
        });
    };
    list_smartbox_page.prototype.alert = function (titolo, sottotitolo, button) {
        var alert = this.alertCtrl.create({
            title: titolo,
            subTitle: sottotitolo,
            buttons: [button]
        });
        alert.present();
    };
    list_smartbox_page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/home/sivlab/github/Smartbox/smartbox_test/src/pages/list_smartbox/list_smartbox.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>LIST SMARTBOX</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n\n    <div *ngIf="smartboxes | async as test; else loading">\n      <ion-item text-wrap *ngFor="let s of test">\n        <pre>{{s}}</pre>\n      </ion-item>\n    </div>\n\n  </ion-list>\n\n</ion-content>\n\n<ng-template #loading>\n  Loading...\n</ng-template>\n'/*ion-inline-end:"/home/sivlab/github/Smartbox/smartbox_test/src/pages/list_smartbox/list_smartbox.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__angular_fire_database__["a" /* AngularFireDatabase */]])
    ], list_smartbox_page);
    return list_smartbox_page;
}());

//# sourceMappingURL=list_smartbox.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddSbPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_http__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_qr_scanner__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_fire_storage__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_fire_database__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import 'rxjs/add/observable/of'; -> Uso metodo Observable.og()
 //ed uso direttamente -> of() -> Questo perchè si è passati a rxjs@6xx (per far funzionare download file di firebase, vedi changelog)
 //scansione qrcode



 //prelevo dati storage permanente (id operatore)
var AddSbPage = /** @class */ (function () {
    function AddSbPage(alertCtrl, qrScanner, http, storage, db, nativeStorage) {
        this.alertCtrl = alertCtrl;
        this.qrScanner = qrScanner;
        this.http = http;
        this.storage = storage;
        this.db = db;
        this.nativeStorage = nativeStorage;
        this.hotels = [];
        this.levels = [];
        this.rooms = [];
        /*
        Flusso del programma:
          -Prelevo i link per il download dei file (hotels.json, hotels.xml) fa firebase
          -Prelievo file JSON
          -se (disponibile && validato):
            -vero:
              -> Viene mostrato il bottone per scansionare QRcode + tasti indietro
                -> QRcode non trovato -> Telecamera sempre in run
                -> QRcode trovato:
                  -> Viene mostrato:
                    -> Label con ID scansionato
                    -> Menu a tendina per scegliere hotel, piano, etc
            -falso:
              -> A video viene mostrato un file di errore "bla bla ... contattare amministratore"
         */
        this.firebase_get_url();
    }
    //Funzione prelievo URL dei file da scaricare
    AddSbPage.prototype.firebase_get_url = function () {
        var _this = this;
        var ref_hotels_json = this.storage.ref('hotels.json');
        this.url_firebase_hotels_json = ref_hotels_json.getDownloadURL();
        this.url_firebase_hotels_json.subscribe(function (url) {
            //una volta che l'observer ha ricevuto l'url
            //lo salvo
            //chiamo le funzione per prendere il file (loadData())
            _this.url_hotels_json = url;
            _this.loadData();
        }); //in url_hotels_json ho URL del file "hotels.json"
        var ref_hotels_xml_ = this.storage.ref('hotels.xml');
        this.url_firebase_hotels_xml = ref_hotels_xml_.getDownloadURL();
        this.url_firebase_hotels_xml.subscribe(function (url) { _this.url_hotels_xml = url; }); //in url_hotels_xml ho URL del file "hotels.xml"
    };
    //Funzione prelievo dati attraverso i link + validazione
    AddSbPage.prototype.loadData = function () {
        var _this = this;
        //richiesta http
        this.http.get(this.url_hotels_json, {}, {})
            .then(function (data) {
            //validazione del file -> validazione JSON
            try {
                _this.temp = JSON.parse(data.data); //test error -> passare "b" data.data
                //Validation del file JSON ha avuto successo!
                console.log("Loading dei dati avvenuto con successo.");
                //validazione OK -> Carico i dati in hotel
                for (var i = 0; i < _this.temp.hotels.length; i++) {
                    _this.hotels[i] = _this.temp.hotels[i].name_hotel;
                }
                //mostro il pulsante per scansionare
                _this.toggle_div("show_button_qrscan", "enable");
            }
            catch (e) {
                _this.error = "Errore nella validazione del file JSON relativo alle piantine. Contattare amministratore di sistema.\t\t\n\nErrore specifico: " + e.message;
                console.log(_this.error);
                //display image error
                _this.toggle_div("display_error", "enable");
            }
        })
            .catch(function (errore) {
            _this.error = "Errore nel recupero dei dati dal server.Possibili cause:\t\n-Manca connessione\t\n-File mancante sul server\t\t\n\nErrore specifico: " + errore.toString();
            console.log(_this.error);
            _this.toggle_div("display_error", "enable");
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
                _this.qrScanner.useBackCamera();
                _this.qrScanner.show(); //workaround
                _this.showCamera();
                var scanSub_1 = _this.qrScanner.scan().subscribe(function (text) {
                    //nascondo fotocamera
                    scanSub_1.unsubscribe(); // stop scanning
                    _this.hideCamera(); //workaround
                    //in "text" ho i dati scansionati
                    //validazione! -> Numero compreso tra 1 e 999
                    if (_this.check_qr_code(text)) {
                        //validazione dati scansioni: OK
                        _this.toggle_div("show_button_qrscan", "enable"); //rendo nuovamente visibile il pulsante per avviare lo scan
                        console.log('Scanned something', text);
                        _this.text = text;
                        _this.toggle_div("show_hotel", "enable");
                    }
                    else {
                        //validazione dati scansioni: NO
                        _this.alert("Errore dati scansionati", "Il QRCode associato alla Smartbox deve essere un numero compreso tra 1 e 999.", "Riprova");
                        _this.toggle_div("show_button_qrscan", "enable"); //rendo nuovamente visibile il pulsante per avviare lo scan
                    }
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
        var _this = this;
        //controllo che tutti i campi siano stati selezionati
        //l'utente al momento di selezionare la "room" può uscire dal popup senza premere "ok" -> vedi changelog
        if (typeof this.hotel !== "undefined" &&
            typeof this.level !== "undefined" &&
            typeof this.room !== "undefined") {
            //invio dati al server
            //prelevo l'id dell'operatore (cioè l'email con cui si è autenticato) -> Mi serve per inviare il record al server
            //var id_operatore = await this.get_id_operator();
            //TODO: si potrebbe fare una funzione "get_id_operator() solo che ritorna una Promise quindi...blabla...
            this.nativeStorage.getItem('id_operator')
                .then(function (id) {
                //Dato prelevato con successo
                console.log("Prelevato l'id_operatore precedentemente memorizzato: " + id); //debug
                console.log("Invio dati al server: " + _this.hotel + "," + _this.level + "," + _this.room + "," + _this.text + "," + id);
                //creo oggetto da inviare al database -> RICORDA: firebase storage è fatto di JSON tree
                var total = {};
                var key = Date.now();
                var value = {
                    hotel: _this.hotel,
                    level: _this.level,
                    room: _this.room,
                    id_smartbox: _this.text,
                    id_operator: id
                };
                total[Date.now()] = value; //-> In totale ho un oggetto del tipo "timestamp" : {"hotel":"hotel1", "level":"level3", "room":"room105"}
                //mi interfaccio con Firebase
                var itemRef = _this.db.object('smartbox_censite');
                itemRef.update(total);
                _this.alert("Successo", "Smartbox censita con successo!", "OK");
                //reset di tutti i campi
                _this.hotel = null;
                _this.level = null;
                _this.room = null;
                _this.toggle_div("show_hotel", "disable");
                _this.toggle_div("show_level", "disable");
                _this.toggle_div("show_room", "disable");
                _this.toggle_div("show_button_send_data", "disable");
            }, function (error) {
                //Dato non prelevato con successo
                console.error("Errore nel prelevare il dato: " + error.toString()); //debug
                _this.alert("Errore", "Impossibile accedere allo storage del dispositivo. Contattare l'amministratore di sistema.", "Ok");
            });
        }
        else {
            this.alert("Errore", "Tutti i campi devono essere non vuoti", "Riprova");
        }
        /*    this.items = db.list('smartbox_censite').valueChanges();
            this.items.subscribe(value => console.log(value));
            const itemRef = db.object('smartbox_censite');
        
            //nel metodo "update()" non si possono passare più variabili, quindi creo una sola variabile ("final_string") che contiene il nuovo elemento da inserire nel database
            //esempio: "timestamp" : {"hotel":"hotel1", "level":"level3", "room":"room105"}
        
            var value = {
              hotel: null,
              level: null,
              room: null,
              id_smartbox: null
            };
            value.hotel = "hotel1";
            value.level = "level3";
            value.room = "room105";
            value.id_smartbox = "65";
            var valueString= JSON.stringify(value); //value come stringa
            var timestamp = Date.now(); //timestamp come stringa
            var final_string = "{\"" + timestamp + "\"" + ":" + valueString + "}"; //creo la stringa finale: timestamp : value (key : value)
        
            //prima di passare al metodo update() creo un oggetto JSON a partire dalla stringa
            itemRef.update(JSON.parse(final_string));*/
    };
    /*------------------FUNZIONI HELPER------------------*/
    //Il qrcode sulla smartbox deve essere un numero(!) compreso tra 1 e 999(!)
    AddSbPage.prototype.check_qr_code = function (scanned_text) {
        if (!isNaN(scanned_text)
            && Number.isInteger(Number(scanned_text))
            && parseInt(scanned_text) >= 1
            && parseInt(scanned_text) <= 999) {
            return true;
        }
        else {
            return false;
        }
    };
    AddSbPage.prototype.alert = function (titolo, sottotitolo, button) {
        var alert = this.alertCtrl.create({
            title: titolo,
            subTitle: sottotitolo,
            buttons: [button]
        });
        alert.present();
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
        this.levels_ = Object(__WEBPACK_IMPORTED_MODULE_2_rxjs__["of"])(this.levels);
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
        this.rooms_ = Object(__WEBPACK_IMPORTED_MODULE_2_rxjs__["of"])(this.rooms); //rooms_ diventa "osservatore" di this.rooms -> Quindi ogni volta che cambia "rooms" cambia "room_s"
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
    /*-----------------FUNZIONI USCITA-----------------------*/
    AddSbPage.prototype.ionViewWillLeave = function () {
        //Dal momento che la trasparenza è stata impostata manualmente e che l'utente può non portare a termine la scansione
        //ad esempio uscendo dal qrcode o cliccando il tasto "back" allora lo sfondo (trasparenza) va ripristinato
        //altrimenti nelle altre pagine continua a vedersi come sfondo le immagini riprese dalla fotocamera
        console.log("Uscendo dalla pagina \"addsb\" -> Ripristino trasparenza sfondo");
        this.hideCamera();
    };
    AddSbPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addsb',template:/*ion-inline-start:"/home/sivlab/github/Smartbox/smartbox_test/src/pages/addsb/addsb.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      CENSIMENTO SMARTBOX\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="background: none transparent;">\n\n  <!-- Div contenente il possibile errore in fase di parsing -->\n  <div id="display_error" style="display: none;" text-center="">\n    <img src="../../assets/imgs/error.png" width="100" height="100">\n    <br>\n    {{error}}\n  </div>\n\n\n  <!--\n    Pagina principale che consta di:\n      -Pulsante per avviare la scansione QRCode\n      -Menu tendina per gli hotel\n      -Menu tendina per i piani del relativo hotel\n      -Menu tendina per le stanze del relativo piano\n      -Pulsante per inviare i dati al server = dato prelevato dal QRCode + dati su hotel, piano, stanza\n  -->\n  <div id="show_button_qrscan" style="display: none;" text-center="">\n    <button ion-button (click)="qr_scanner()">Scan for QRCode</button>\n  </div>\n\n  <div id="show_hotel" style="display: none;">\n    <ion-item>\n      <ion-label>Hotel</ion-label>\n      <ion-select [(ngModel)]="hotel">\n        <ion-option *ngFor="let item of hotels" [value]="item"\n                    (ionSelect)="fillLevels(item); toggle_div(\'show_level\',\'enable\')">{{item}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </div>\n\n\n  <div id="show_level" style="display: none;">\n    <div *ngIf="levels_ | async; else loading; let livelli">\n      <ion-item>\n        <ion-label>Level</ion-label>\n        <ion-select [(ngModel)]="level">\n          <ion-option *ngFor="let item of livelli" [value]="item.name_level"\n                      (ionSelect)="fillRooms(item.name_level); toggle_div(\'show_room\',\'enable\')">{{item.name_level}}</ion-option>\n        </ion-select>\n      </ion-item>\n    </div>\n  </div>\n\n\n  <div id="show_room" style="display: none;">\n    <div *ngIf="rooms_ | async; else loading; let camere">\n      <ion-item>\n        <ion-label>Room</ion-label>\n        <ion-select [(ngModel)]="room">\n          <ion-option *ngFor="let item of camere" [value]="item"\n                      (ionSelect)="toggle_div(\'show_button_send_data\',\'enable\')">{{item}}</ion-option>\n        </ion-select>\n      </ion-item>\n    </div>\n  </div>\n\n\n  <div id="show_button_send_data" style="display: none;" text-center="">\n    <button ion-button (click)="send_data()">Send data to server</button>\n  </div>\n\n\n  <ng-template #loading>\n    Loading...\n  </ng-template>\n\n</ion-content>\n\n'/*ion-inline-end:"/home/sivlab/github/Smartbox/smartbox_test/src/pages/addsb/addsb.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_qr_scanner__["a" /* QRScanner */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_5__angular_fire_storage__["a" /* AngularFireStorage */], __WEBPACK_IMPORTED_MODULE_6__angular_fire_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_storage__["a" /* NativeStorage */]])
    ], AddSbPage);
    return AddSbPage;
}());

//# sourceMappingURL=addsb.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LogoutPage = /** @class */ (function () {
    function LogoutPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.logout();
    }
    LogoutPage.prototype.logout = function () {
        /*
        il logout dell'utente non fa che:
          -settare la rootpage = loginpage
          -e da questa pagina (vedi relativo codice) non si può andare da nessuna parte se non ci si autentica
         */
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]); //setto la rootPage
        this.navCtrl.popToRoot(); //vado alla rootPage (appena settata)
    };
    LogoutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-logout',template:/*ion-inline-start:"/home/sivlab/github/Smartbox/smartbox_test/src/pages/logout/logout.html"*/'<!--\nPagina vuota\nIl layout di questa pagina non viene nemmeno caricato in quanto, nel costruttore (vedi logout.ts)\nsi rimanda immediatamente il controllo alla pagina LoginPage (si effettua il logout)\n-->\n'/*ion-inline-end:"/home/sivlab/github/Smartbox/smartbox_test/src/pages/logout/logout.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], LogoutPage);
    return LogoutPage;
}());

//# sourceMappingURL=logout.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListNotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListNotificationsPage = /** @class */ (function () {
    function ListNotificationsPage(alertCtrl, nativeStorage) {
        this.alertCtrl = alertCtrl;
        this.nativeStorage = nativeStorage;
        this.notifi_list = [];
        this.get_notifications();
    }
    ListNotificationsPage.prototype.get_notifications = function () {
        var _this = this;
        //prelevo tutte le chiavi
        this.nativeStorage.keys().then(function (data) {
            //seleziono solo le chiavi che iniziano per "notification_" -> Sono le notifiche -> le altre sono dati del sistema che in questo caso non mi interessano
            for (var dataKey in data) {
                //in data[dataKey] ho il NOME della chiave
                //seleziono solo le chiavi che iniziano per "notification_"
                if (data[dataKey].startsWith("notification_")) {
                    //qui ho le chiavi selezionate
                    //ora devo riaccedere allo storage e prelevare i dati relativi a tale chiave
                    _this.nativeStorage.getItem(data[dataKey]).then(function (messaggio) {
                        //il messaggiodi notifica è salvato in questo formato (vedi app.components.ts
                        // titolo | messaggio
                        // devo quindi separare i due e sostituire il carattere "|" con "\n"
                        //TODO: in realtà questo sistema fallisce nel momento in cui nel titolo o messaggio della notifica ci sia un carattere "|"
                        _this.notifi_list.push(messaggio.replace(/\|/g, "\n"));
                    });
                }
            }
            _this.notifications_ = Object(__WEBPACK_IMPORTED_MODULE_2_rxjs__["of"])(_this.notifi_list);
        });
    };
    ListNotificationsPage.prototype.erase_notifications = function () {
        var _this = this;
        this.nativeStorage.keys().then(function (data) {
            //seleziono solo le chiavi che iniziano per "notification_" -> Sono le notifiche -> le altre sono dati del sistema che in questo caso non mi interessano
            for (var dataKey in data) {
                //in data[dataKey] ho il NOME della chiave
                //seleziono solo le chiavi che iniziano per "notification_"
                if (data[dataKey].startsWith("notification_")) {
                    //qui ho le chiavi selezionate
                    //ora devo cancellarle
                    _this.nativeStorage.remove(data[dataKey]);
                    //avviso utente
                    _this.alert("Notifiche", "Notifiche cancellate con successo.\nSi prega ri ricaricare la pagina.", "Ok");
                }
            }
        });
    };
    ListNotificationsPage.prototype.alert = function (titolo, sottotitolo, button) {
        var alert = this.alertCtrl.create({
            title: titolo,
            subTitle: sottotitolo,
            buttons: [button]
        });
        alert.present();
    };
    ListNotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list-notifications',template:/*ion-inline-start:"/home/sivlab/github/Smartbox/smartbox_test/src/pages/list-notifications/list-notifications.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>LIST NOTIFICATIONS</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n\n    <div *ngIf="notifications_ | async as notify; else loading">\n      <ion-item *ngFor="let n of notify">\n        <pre>{{n}}</pre>\n      </ion-item>\n    </div>\n\n  </ion-list>\n\n  <button ion-button (click)="erase_notifications()">ERASE NOTIFICATIONS</button>\n\n</ion-content>\n\n<ng-template #loading>\n  Loading...\n</ng-template>\n'/*ion-inline-end:"/home/sivlab/github/Smartbox/smartbox_test/src/pages/list-notifications/list-notifications.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */]])
    ], ListNotificationsPage);
    return ListNotificationsPage;
}());

//# sourceMappingURL=list-notifications.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(439);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_qr_scanner__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_smartbox_list_smartbox__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_addsb_addsb__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_logout_logout__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_list_notifications_list_notifications__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_http__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_native_storage__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_fire__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_fire_storage__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__environments_environment__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_fire_auth__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_fire_database__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_fire_messaging__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_push__ = __webpack_require__(304);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















//Firebase






//notifiche push

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_smartbox_list_smartbox__["a" /* list_smartbox_page */],
                __WEBPACK_IMPORTED_MODULE_11__pages_list_notifications_list_notifications__["a" /* ListNotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_addsb_addsb__["a" /* AddSbPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_logout_logout__["a" /* LogoutPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_16__angular_fire__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_18__environments_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_19__angular_fire_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_17__angular_fire_storage__["b" /* AngularFireStorageModule */],
                __WEBPACK_IMPORTED_MODULE_21__angular_fire_messaging__["a" /* AngularFireMessagingModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_smartbox_list_smartbox__["a" /* list_smartbox_page */],
                __WEBPACK_IMPORTED_MODULE_11__pages_list_notifications_list_notifications__["a" /* ListNotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_addsb_addsb__["a" /* AddSbPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_logout_logout__["a" /* LogoutPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_0__ionic_native_qr_scanner__["a" /* QRScanner */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_native_storage__["a" /* NativeStorage */],
                __WEBPACK_IMPORTED_MODULE_20__angular_fire_database__["a" /* AngularFireDatabase */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_push__["a" /* Push */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_smartbox_list_smartbox__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_addsb_addsb__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_logout_logout__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_list_notifications_list_notifications__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_push__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_storage__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











//notifiche push


var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, push, nativeStorage, alertCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.push = push;
        this.nativeStorage = nativeStorage;
        this.alertCtrl = alertCtrl;
        //La pagina root deve essere quella del login, infatti l'utente, finchè non si autentica, non deve poter accedere a null'altro
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Add Smartbox', component: __WEBPACK_IMPORTED_MODULE_6__pages_addsb_addsb__["a" /* AddSbPage */] },
            { title: 'List Smartbox', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_smartbox_list_smartbox__["a" /* list_smartbox_page */] },
            { title: 'List Notifications', component: __WEBPACK_IMPORTED_MODULE_9__pages_list_notifications_list_notifications__["a" /* ListNotificationsPage */] },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_8__pages_logout_logout__["a" /* LogoutPage */] }
        ];
        this.pushSetup();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleLightContent();
            _this.splashScreen.hide();
        });
    };
    //Richiamata da pagina html -> Quando nel menu si clicca su una possibile pagina
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component == __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]) {
            //se non ci fosse if-else e solo questo comando, non si potrebbe usare il pulsante "back"
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
        }
        else {
            this.nav.push(page.component);
        }
    };
    MyApp.prototype.pushSetup = function () {
        var _this = this;
        var options = {
            android: {
                senderID: '593512003507',
                sound: true,
                vibrate: true,
                forceShow: true
            }
        };
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (notification) {
            console.log('Received a notification', notification);
            //memorizzo la notifica nello storage
            _this.nativeStorage.setItem('notification_' + Date.now(), "Titolo:" + notification.title + "|" + "Messaggio:" + notification.message)
                .then(function () {
                //Dato memorizzato con successo
                console.log("Notifica memorizzata con successo");
            });
            //alert all'utente con il contenuto della notifica
            _this.alert("Notifica: " + notification.title, notification.message + "<br/>.La notifica può essere riletta nella sezione list notifications", "Ok");
        });
        pushObject.on('registration').subscribe(function (registration) { return console.log('Device registered', registration); });
        pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin', error); });
    };
    MyApp.prototype.alert = function (titolo, sottotitolo, button) {
        var alert = this.alertCtrl.create({
            title: titolo,
            subTitle: sottotitolo,
            buttons: [button]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/sivlab/github/Smartbox/smartbox_test/src/app/app.html"*/'<ion-menu id="side_menu" [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content padding>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="true"></ion-nav>\n'/*ion-inline-end:"/home/sivlab/github/Smartbox/smartbox_test/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_push__["a" /* Push */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    firebase: {
        apiKey: "AIzaSyCighuTMeTHf-2EK6grKTlBA95pBcyTH30",
        authDomain: "progettoingsw-56002.firebaseapp.com",
        databaseURL: "https://progettoingsw-56002.firebaseio.com",
        projectId: "progettoingsw-56002",
        storageBucket: "progettoingsw-56002.appspot.com",
        messagingSenderId: "593512003507"
    }
};
//# sourceMappingURL=environment.js.map

/***/ })

},[306]);
//# sourceMappingURL=main.js.map