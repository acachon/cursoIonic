import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { Storage } from '@ionic/storage';
import { Cancion } from '../../app/BuscadorItunes.model';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[]=['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
  'american-football', 'boat', 'bluetooth', 'build'];
  items: Array<{titulo: string, autor: string, icon: string, src: string, audio: string, id: number}>;
  private flagBorrar: boolean=false;  //marco si se ha borrado la cancion
  private misFavoritos: Cancion[];      //Mi lista de favoritos


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
          src: "assets/imgs/ItunesIonic_logo.png",
          audio: "",
          id:0,
        }];
      } else {          //si existe una lista la cargo y sumo al final la nueva cancion
          console.log("Tienes " + val.length + " canciones favoritas" );
          //Actualizo el listado de elementos a mostrar, sustituyendo la plantilla por los favoritos
          for(let i = 0; i < val.length; i++) {
            this.items[i]={
              titulo: val[i].trackName,
              autor: val[i].artistName,
              icon: this.icons[Math.floor(Math.random() * this.icons.length)],     //Cambiar la estructura para meter la portada
              src: val[i].artworkUrl100,
              audio: val[i].previewUrl,
              id: val[i].trackId,
            };
          }
        }
    });  
  } //Fin constructor

  itemTapped(event, item) {
    //Abro una ventana con al ficha para escucharla
    if (!this.flagBorrar){  //si flag is true es porque he pinchado en borrar y borrado el elemento
      this.navCtrl.push(ItemDetailsPage, {
        item: item
      });
    } else{
      this.flagBorrar=false;    //Lo vuelvo a su valor por defecto tras haber borrado e ignorado el click
    }
  }

  itemDeleted(event, item) {
  //Borro el elemento elegido del listado y del fichero
    //Borro la cancion de mis favoritos
    console.log("Eliminada la cancion: " + item.titulo);

    //Borro el elemento (item) del array (items)
    this.flagBorrar=true;    //cuando se dispare el evento click sobre el boton para ir a la ficha de la cancion, lo marco a null
    
    //Recreo el array menos el objeto que quiero quitar (la pagina se actualizara)
    this.items = this.items.filter(obj => obj !== item);

    //Reescribo el storage con el nuevo array sin ese elemento
    
    //Recupero el listado guardado en storage para eliminar la elegida
    //Actualizo el fichero en esta misma promesa
    this.storage.get("favoritos").then((val) => {
      if (val==null){ //Si no existe inicializo misFavoritos
        this.misFavoritos=undefined;
      }else{
        this.misFavoritos=val;
        console.log("Ya tenias " + val.length + " canciones favoritas" );
    
        //Filtro el elemento que se ha elegido elinminar (identificado por su trackId)
        this.misFavoritos = this.misFavoritos.filter(obj => obj.trackId !== item.id);
    
        //Vuelvo a almacenar el listado de favoritos completo  
        this.storage.set("favoritos", this.misFavoritos);
        console.log("Eliminada en fichero: " + item.trackId);
        console.log("Ahora tienes " + this.misFavoritos.length + " favoritos, solo.");
      }
    });
  } //Fin itemDeleted
} // Fin class ListPage
