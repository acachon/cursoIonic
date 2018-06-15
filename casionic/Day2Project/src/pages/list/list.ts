import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string, src: string}>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage) {

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    //Creo una lista por defecto como el template
    
    this.items = [];
    /*
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    */

    // Recupero del storage la lista de favoritos para ver actualizar el listado de esta pagina
    this.storage.get("favoritos").then((val) => 
    {
      console.log("Tienes " + val.length + " canciones favoritas" );
      //Actualizo el listado de elementos a mostrar, sustituyendo la plantilla por los favoritos
      //this.items = [];
      for(let i = 0; i < val.length; i++) {
        this.items[i]={
          title: 'Favorito ' + (i+1),
          note: val[i].trackName,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)],     //Cambiar la estructura para meter la portada
          src: val[i].artworkUrl100
        };
      }
    });
    
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
