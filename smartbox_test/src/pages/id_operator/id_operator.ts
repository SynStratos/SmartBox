import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage'; //memorizzazione dati storage permanente (es. id operatore)
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'id_operator.html'
})

export class id_operator_page {

  public id_operator; //dato da modificare
  //public id_operator_: Observable<any>; //Observable del dato precedente -> Uso questo in HTML così cambia dinamicamente
  public check_id_idoperator;

  constructor(private nativeStorage: NativeStorage, private alertCtrl: AlertController) {
    this.show_id_operator();
  }


  show_id_operator(){

    this.nativeStorage.getItem('id_operator')
      .then(
        data => {

          //Dato prelevato con successo
          console.log("Prelevato l'id_operatore precedentemente memorizzato: " + data); //debug
          this.id_operator = data; //in "data" ho l'id_operatore
          this.toggle_div("show_id_operatore", "enable"); //mostro a video

        },
        error => {
          //Dato non prelevato con successo
          console.error("Errore nel prelevare il dato: "+ error.toString()); //debug
          // infatti la prima volta (in assoluto) che avvio l'app non preleverò il dato con successo (visto che non esiste)
          // quindi devo dare la possibilità di inserirlo
          this.toggle_div("show_id_operatore", "enable"); //mostro a video

        }
      )
  }




  /*------------------FUNZIONI UTILI HTML------------------*/

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

  set_id_operator() {

    /*Controllo che l'id sia:
      -Sia un numero -> !isNan
      -Numero intero -> Number.Integer()
      -Maggiore di zero -> >0
      -Compreso tra 1 e 999 -> <999
    */
    if(!isNaN(this.check_id_idoperator)
      && Number.isInteger(Number(this.check_id_idoperator)) //uso Number() altrimenti il controllo fallisce, essendo "this.check_id_idoperator" una stringa
      && parseInt(this.check_id_idoperator) >= 1
      && parseInt(this.check_id_idoperator) <= 999
    ){

      //Controlli superati
      //Setto l'id in memoria
      this.nativeStorage.setItem('id_operator', this.check_id_idoperator)
        .then(
          () => console.log('Stored item!'),
          error => {
            console.error('Error storing item', error);
            this.alert("Error storing item", error);
          }
        );

      //Aggiorno this.is_operator così nella pagina HTML si aggiorna il valore
      this.nativeStorage.getItem('id_operator')
        .then(
          data => {
            this.id_operator = data;
          },
          error => {
            console.error("Errore nel prelevare il dato: "+ error.toString());
            this.alert("Errore nel prelevare il dato", error.toString());
          }
        )
    }
    else{
      this.alert("Error in ID", "The ID must be a NUMBER. (min:1, max: 999)");
      console.log('Error in ID. The ID must be a number. (min:1, max: 999). Valore immesso:' + this.check_id_idoperator);
    }
  }

  alert(titolo, sottotitolo){
    let alert = this.alertCtrl.create({
      title: titolo,
      subTitle: sottotitolo,
      buttons: ['Dismiss']
    });
    alert.present();
  }


}
