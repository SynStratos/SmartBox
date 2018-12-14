import {Component} from '@angular/core';
import {HTTP} from '@ionic-native/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner'; //scansione qrcode



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


  constructor(public qrScanner: QRScanner, public http: HTTP) {
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
  loadData() {
    //URL del file JSON
    let url = 'http://progettoftp.altervista.org/pepe.json';

    //richiesta http
    this.http.get(url, {}, {})
      .then(data => {

        //validazione del file -> validazione JSON
        try {
          this.temp = JSON.parse(data.data); //test error -> passare "b" data.data


          //Validation del file JSON ha avuto successo!
          console.log("Loading dei dati avvenuto con successo.");

          //validazione OK -> Carico i dati in hotel
          for (let i = 0; i < this.temp.hotels.length; i++) {
            this.hotels[i] = this.temp.hotels[i].name_hotel
          }

          //mostro il pulsante per scansionare
          this.toggle_div("show_button_qrscan", "enable");

        } catch (e) {
          this.error = "Errore nel recupero dei dati dal server.Possibili cause:\n\t-Formato del file scaricato dal server non corretto\t\t\n\nErrore specifico: " + e.message;
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
          this.qrScanner.show(); //workaround
          this.showCamera();

          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            //nascondo fotocamera
            scanSub.unsubscribe(); // stop scanning
            this.hideCamera(); //workaround
            this.toggle_div("show_button_qrscan", "enable"); //rendo nuovamente visibile il pulsante per avviare lo scan


            //in "text" ho i dati prelevati dal qrcode -> devo gestirli
            this.text = text;
            console.log('Scanned something', text);
            this.toggle_div("show_hotel", "enable");
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
    console.log("Invio dati al server");
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
    this.levels_ = Observable.of(this.levels);
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
    this.rooms_ = Observable.of(this.rooms) //rooms_ diventa "osservatore" di this.rooms -> Quindi ogni volta che cambia "rooms" cambia "room_s"
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
}
