import {Component} from '@angular/core';
import {HTTP} from '@ionic-native/http';
import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/observable/of'; -> Uso metodo Observable.of()
import { of } from 'rxjs'; //ed uso direttamente -> of() -> Questo perchè si è passati a rxjs@6xx (per far funzionare download file di firebase, vedi changelog)
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner'; //scansione qrcode
import { AlertController } from 'ionic-angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { NativeStorage } from '@ionic-native/native-storage'; //prelevo dati storage permanente (id operatore)
import * as xml2js from 'xml2js'; //per la parte di xml



@Component({
  selector: 'page-addsb',
  templateUrl: 'addsb.html'
})

export class AddSbPage {

  public it;
  public id;
  public room;
  public level;
  public hotel;
  public text;
  public temp;
  public error;

  public hotels: any[] = [];
  public levels: any[] = [];
  public rooms: any[] = [];

  public levels_: Observable<any[]>;
  public rooms_: Observable<any[]>;

  //Variabili per il download dei file "hotels.json" / "hotels.xml"
  public url_firebase_hotels_json: Observable<string | null>; //Observable per contenere Download URL del file su firebase
  public url_hotels_json;
  public url_firebase_hotels_xml: Observable<string | null>; //Observable per contenere Download URL del file su firebase
  public url_hotels_xml;

  //Variabili per gestire il database su firebase
  public items: Observable<any[]>;

  constructor(public alertCtrl: AlertController, public qrScanner: QRScanner, public http: HTTP, public storage: AngularFireStorage, public db: AngularFireDatabase, public nativeStorage: NativeStorage) {
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
  firebase_get_url(){

    const ref_hotels_json = this.storage.ref('hotels.json');
    this.url_firebase_hotels_json = ref_hotels_json.getDownloadURL();
    this.url_firebase_hotels_json.subscribe(url=>{

      //una volta che l'observer ha ricevuto l'url
      //lo salvo
      //chiamo le funzione per prendere il file (loadData())
      this.url_hotels_json = url;
      this.loadData("json", url); //per abilitare file XML commentare questa riga e decommentare quella XML

    }) //in url_hotels_json ho URL del file "hotels.json"

    const ref_hotels_xml_ = this.storage.ref('hotels.xml');
    this.url_firebase_hotels_xml = ref_hotels_xml_.getDownloadURL();
    this.url_firebase_hotels_xml.subscribe(url=>{

      //una volta che l'observer ha ricevuto l'url
      //lo salvo
      //chiamo le funzione per prendere il file (loadData())
      this.url_hotels_xml = url;
      //this.loadData("xml", url); //per abilitare file JSON commentare questa riga e decommentare quella JSON

    }) //in url_hotels_xml ho URL del file "hotels.xml"*/

  }



  //Funzione prelievo dati attraverso i link + validazione
  loadData(formato, url){


    this.http.get(url, {}, {})
      .then(data => {

        //Creo funzione di validazione
        let Validation = function(){
        };
        /*Creo il suo prototipo aggiungendo due metodi:
          -setStrategy = setta la strategia (Vedi pattern "Strategy")
          -validate() = algoritmo che lancia la validazione
         Essendo un prototipo, ogni instanza di Validation "erediterà" tali funzioni
         Formalmente: avrà un puntatore a tale prototipo
        */
        Validation.prototype = {
          setStrategy: function(strategy) {
            this.strategy = strategy;
          },

          validation: function() {
            return this.strategy();
          }
        };

        /*
        Pattern Strategy:
          -Creo oggetto di tipo Validation (cioè il Context, "contesto di utilizzo")
          -Creo strategie (vedi definizione esterne alla classe)
          -Assegno la strategia (una delle strategie definite al punto sopra)
          -Chiamo la strategia
        */

        let validation = new Validation();

        if(formato == "json"){
          console.log("Validazione JSON");
          //SETTO LA STRATEGIA (VALIDATION + PARSING) FILE JSON
          validation.setStrategy(function(){
            let temp = JSON.parse(data.data); //test error -> passare "b" data.data
            //Validation del file JSON ha avuto successo!
            console.log("Loading dei dati avvenuto con successo.");
            let hotels = [];
            //validazione OK -> Carico i dati in hotel
            for (let i = 0; i < temp.hotels.length; i++) {
              hotels[i] = temp.hotels[i].name_hotel
            }
            return [temp, hotels];
          });
        }
        else if (formato == "xml"){
          console.log("Validazione XML");
          //SETTO LA STRATEGIA (VALIDATION + PARSING) FILE XML
          validation.setStrategy(function(){

            var risultato1 = null;
            var risultato2 = null;

            xml2js.parseString(data.data, function (err, result) {
              var hotels = []; //conterrà i nomi degli hotel
              //var temp = []; -> Inutile, restituisco direttamente result

              //TODO: C'È DA PARSARE ANCHE "result" -> Vedi sotto
              //Rispetto al file JSON c'è un "hotel" in più -> Questo per come xml2js crea il JSON a partire dall'XML
              //C'è un livello in più
              //Devo inserire "hotel" in "hotels" (vedi con console.log() come è formattato)
              //Formalmente: result.hotels.hotel = result.hotels <- ma in questa forma non si può fare
              result.temp = result.hotels.hotel;
              delete result.hotels.hotel;
              result.hotels = result.temp;

              for (let i = 0; i < result.hotels.length; i++){
                hotels[i] = result.hotels[i].name_hotel[0];
              }


              risultato1 = result;
              risultato2 = hotels;
              //non è un return, questa è una funzione di callback!
            });

            return [risultato1, risultato2]; //il "return" precedente non bastava perchè quel return era della funzione di callback!

          });
        }


        try {
          //QUI EFFETTUO LA VALIDAZIONE+PARSING DEL FILE (JSON/XML) CHE SIA
          //QUINDI CHIAMO LA GENERICA STRATEGIA DEL PATTERN STRATEGY (CHE HO SETTATO SOPRA)
          let results = validation.validation();

          this.temp = results[0]; //ho l'array con tutti gli hotel -> Mi servirà per "filllevel" e "fillroom"
          this.hotels = results[1]; // ho solo i nomi di tutti gli hotel


          //mostro il pulsante per scansionare
          this.toggle_div("show_button_qrscan", "enable");

        } catch (e) {
          this.error = "Errore nella validazione del file "+formato+" relativo alle piantine. Contattare amministratore di sistema.\t\t\n\nErrore specifico: " + e.message;
          console.log(this.error);
          //display image error
          this.toggle_div("display_error", "enable");
        }
      })
      .catch(errore =>{
        this.error = "Errore nel recupero dei dati dal server.Possibili cause:\t\n-Manca connessione\t\n-File mancante sul server\t\t\n\nErrore specifico: " + errore.toString();
        console.log(this.error);
        this.toggle_div("display_error", "enable");
      } )

  }


  //Funzione scansione QRCode
  qr_scanner() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          //camera permission was granted
          console.log("Autorizzazione  QRCode OK!");


          /*
          Nascondo tutti i pulsanti -> fotocamera full screen
          In realtà:
            -Al primo avvio è sufficiente solo nascondere il pulsante per il QRScan
            -Però nascondo tutti gli altri per inglobare la casistica in cui il tasto QRScan è ripremuto dopo avere selezionato qualche hotel/piano/stanza
            */

          this.toggle_div("show_button_qrscan", "disable");
          this.toggle_div("show_hotel", "disable");
          this.toggle_div("show_level", "disable");
          this.toggle_div("show_room", "disable");
          this.toggle_div("show_button_send_data", "disable");


          //mostro fotocamera
          this.qrScanner.useBackCamera();
          this.qrScanner.show(); //workaround
          this.showCamera();

          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            //nascondo fotocamera
            scanSub.unsubscribe(); // stop scanning
            this.hideCamera(); //workaround

            //in "text" ho i dati scansionati
            //validazione! -> Numero compreso tra 1 e 999
            if(this.check_qr_code(text)){

              //validazione dati scansioni: OK
              this.toggle_div("show_button_qrscan", "enable"); //rendo nuovamente visibile il pulsante per avviare lo scan
              console.log('Scanned something', text);
              this.text = text;
              this.toggle_div("show_hotel", "enable");
            }
            else{
              //validazione dati scansioni: NO
              this.alert("Errore dati scansionati","Il QRCode associato alla Smartbox deve essere un numero compreso tra 1 e 999.", "Riprova");
              this.toggle_div("show_button_qrscan", "enable"); //rendo nuovamente visibile il pulsante per avviare lo scan
            }

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


  send_data() {

    //controllo che tutti i campi siano stati selezionati
    //l'utente al momento di selezionare la "room" può uscire dal popup senza premere "ok" -> vedi changelog
    if(
      typeof this.hotel !== "undefined" &&
      typeof this.level !== "undefined" &&
      typeof this.room !== "undefined"
    ){

      //invio dati al server

      //prelevo l'id dell'operatore (cioè l'email con cui si è autenticato) -> Mi serve per inviare il record al server

      //TODO: si potrebbe fare una funzione "get_id_operator()" solo che ritorna una Promise

      this.nativeStorage.getItem('id_operator')
        .then(
          id => {
            //Dato prelevato con successo
            console.log("Prelevato l'id_operatore precedentemente memorizzato: " + id); //debug
            console.log("Invio dati al server: "+this.hotel+","+this.level+","+this.room+","+this.text+","+id);

            //creo oggetto da inviare al database -> RICORDA: firebase storage è fatto di JSON tree
            var total = {};
            var key = Date.now();
            var value = {
              hotel: this.hotel,
              level: this.level,
              room: this.room,
              id_smartbox: this.text,
              id_operator: id
            };
            total[Date.now()] = value; //-> In totale ho un oggetto del tipo "timestamp" : {"hotel":"hotel1", "level":"level3", "room":"room105"}

            //mi interfaccio con Firebase
            const itemRef = this.db.object('smartbox_censite');
            itemRef.update(total);

            this.alert("Successo","Smartbox censita con successo!","OK");

            //reset di tutti i campi
            this.hotel = null;
            this.level = null;
            this.room = null;
            this.toggle_div("show_hotel", "disable");
            this.toggle_div("show_level", "disable");
            this.toggle_div("show_room", "disable");
            this.toggle_div("show_button_send_data", "disable");

          },
          error => {
            //Dato non prelevato con successo
            console.error("Errore nel prelevare il dato: "+ error.toString()); //debug
            this.alert("Errore", "Impossibile accedere allo storage del dispositivo. Contattare l'amministratore di sistema.", "Ok");
          }
        )
    }
    else{
      this.alert("Errore", "Tutti i campi devono essere non vuoti", "Riprova");
    }

  }




  /*------------------FUNZIONI HELPER------------------*/

  //Il qrcode sulla smartbox deve essere un numero(!) compreso tra 1 e 999(!)
  check_qr_code(scanned_text){
    if(!isNaN(scanned_text)
      && Number.isInteger(Number(scanned_text))
      && parseInt(scanned_text) >= 1
      && parseInt(scanned_text) <= 999
    ){
      return true;
    }
    else{
      return false;
    }
  }

  alert(titolo, sottotitolo, button){
    let alert = this.alertCtrl.create({
      title: titolo,
      subTitle: sottotitolo,
      buttons: [button]
    });
    alert.present();
  }



  /*------------------FUNZIONI UTILI HTML------------------*/

  /*
  Funzione che accetta 2 parametri:
    -name: nome del div da mostrare/nascondere/switchare
    -option:
      -"enable" -> mostra il div nella pagina html
      -"disable" -> nasconde il div nella pagine html
      -"toggle" -> mostra/nasconde a seconda che il div sia nascosto/mostrato
   */

  toggle_div(name, option) {
    var html_error = document.getElementById(name);
    if (option == "toggle") {
      if (html_error.style.display === "none") {
        html_error.style.display = "block";
      } else {
        html_error.style.display = "none";
      }
    } else if (option == "enable") {
      html_error.style.display = "block";
    } else if (option == "disable") {
      html_error.style.display = "none";
    }
  }

  //output: in this.levels_ ho solo i "piani" relativi all'hotel specificato "name_hotel"
  fillLevels(name_hotel) {
    this.levels = [];
    for (let i = 0; i < this.temp.hotels.length; i++) { //ciclo tutto l'array di hotel
      if (this.temp.hotels[i].name_hotel == name_hotel) { //prendo solo gli elementi (gli hotel) che hanno nome "name_hotel"
        for (let j = 0; j < this.temp.hotels[i].levels.length; j++) {
          this.levels[j] = this.temp.hotels[i].levels[j] //.name_level //ogni livello di questi (hotel con nome name_hotel) li inserisco nel vettore this.levels
        }
        break //non ci sono due hotel con lo stesso nome
      }
    }
    this.levels_ = of(this.levels);
  }

  //output: in this.rooms_ ho solo le "stanze" relative al piano specificato "name_floor"
  fillRooms(name_floor) {
    //stessa cosa della funzione fillLevels
    this.rooms = [];
    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].name_level == name_floor) {
        for (let j = 0; j < this.levels[i].rooms.length; j++) {

          this.rooms[j] = this.levels[i].rooms[j].name_room
        }
        break
      }
    }
    this.rooms_ = of(this.rooms) //rooms_ diventa "osservatore" di this.rooms -> Quindi ogni volta che cambia "rooms" cambia "room_s"
  }



  /*------------------FUNZIONI WORKAROUND------------------*/

  /*
-https://forum.ionicframework.com/t/qr-scanner-seems-to-be-working-in-the-background-but-doesnt-display-a-preview-when-calling-show/99822/6
-(altro possibile workaround: https://github.com/ionic-team/ionic-native/issues/1812)
-workaround -> Metodo show() ufficiale non funziona
-qrScanner.show() non elimina lo sfondo dell'app e quindi tutto viene avviato senza errori ma il qrscanner è in run "sotto" l'applicazione
-questo workaround non fa altro che settare lo sfondo dell'app trasparente (showCamera()) e lo ripristina (hideCamera())
-Tecnicamente aggiungono e rimuovo una classe CSS che setta/rimuove lo sfondo a trasparente
*/
  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }


  /*-----------------FUNZIONI USCITA-----------------------*/

  ionViewWillLeave() {
    //Dal momento che la trasparenza è stata impostata manualmente e che l'utente può non portare a termine la scansione
    //ad esempio uscendo dal qrcode o cliccando il tasto "back" allora lo sfondo (trasparenza) va ripristinato
    //altrimenti nelle altre pagine continua a vedersi come sfondo le immagini riprese dalla fotocamera
    console.log("Uscendo dalla pagina \"addsb\" -> Ripristino trasparenza sfondo");
    this.hideCamera();
  }

}
