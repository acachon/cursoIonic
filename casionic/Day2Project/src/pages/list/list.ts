import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[]=['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
  'american-football', 'boat', 'bluetooth', 'build'];

  items: Array<{titulo: string, autor: string, icon: string, src: string}>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage) {

    //Recreo la lista de nuevo
    this.items = [];
    
    // Recupero del storage la lista de favoritos para ver actualizar el listado de esta pagina
    this.storage.get("favoritos").then((val) => 
    {
      if (val==null){   //Si no hay lista de favoritos
        this.items=[{
          titulo: "Lista vacia",
          autor: "",
          icon: this.icons[Math.floor(Math.random() * this.icons.length)],     //Cambiar la estructura para meter la portada
          src: "assets/imgs/ItunesIonic_logo.png"
        }];
      } else {          //si existe una lista la cargo y sumo al final la nueva cancion
          console.log("Tienes " + val.length + " canciones favoritas" );
          //Actualizo el listado de elementos a mostrar, sustituyendo la plantilla por los favoritos
          //this.items = [];
          for(let i = 0; i < val.length; i++) {
            this.items[i]={
              titulo: val[i].trackName,
              autor: val[i].artistName,
              icon: this.icons[Math.floor(Math.random() * this.icons.length)],     //Cambiar la estructura para meter la portada
              src: val[i].artworkUrl100
            };
          }
        }
    });
      
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
