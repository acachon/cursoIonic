import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { Cancion } from '../../app/MisFavoritos.model';
import { MisFavoritos } from '../../app/MisFavoritos.service';

@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
  providers: [MisFavoritos]
})
export class FavoritosPage {

  //Variables globales a la clase
  //----------------------------------------------//

  private items: Array<{              //Cargo el listado de favoritos guardado 
    titulo: string,
    autor: string,
    src: string,
    audio: string,
    id: number}>;
  private flagBorrar: boolean=false;  //marco si se ha borrado la cancion
  private misFavoritos: Cancion[];      //Mi lista de favoritos

  //constructor e inicializacion de variables
  //---------------------------------------------//

  //Cargo el listado existente en el storage para inicializar mis favoritos
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private servicioListaFavoritos: MisFavoritos) {

    //Inicializo la lista la lista de nuevo
    this.items = [];
    
    // Recupero del storage la lista de favoritos para ver actualizar el listado de esta pagina 
    
    //Llamo al servicio de itunes para buscar el texto seleccionado
    //Actualizo items en la promesa que es lo que se muestra en el HTML    
    this.servicioListaFavoritos.itemsRefresh().then((val) => {
      console.log("Respuesta a promesa itemRefresh");
      console.log(val);
      if (val==null || val.length==0){   //Si no hay lista de favoritos
        this.items=[{
          titulo: "Lista vacia",
          autor: "",
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
              src: val[i].artworkUrl100,
              audio: val[i].previewUrl,
              id: val[i].trackId,
            };
          }
        } 
    });
  }

  //Funciones y metodos locales a este componente
  //---------------------------------------------//

  itemTapped(event, item) {
  //Voy a una pagina con la ficha para escuchar la cancion favorita seleccionada
    if (!this.flagBorrar && item.id!==0){  //si flag is true es porque he pinchado en borrar y borrado el elemento
      //Voy al componente ItemDEtailsPage al que le paso la cancion (item) como input
      this.navCtrl.push(ItemDetailsPage, {item: item});
    } else{
      this.flagBorrar=false;    //Lo vuelvo a su valor por defecto tras haber borrado e ignorado el click
    }
  }

  itemDeleted(event, item) {
  //Borro el elemento elegido del listado y del fichero
    console.log("Eliminada la cancion: " + item.titulo);
    this.flagBorrar=true;    //Este flag impide que luego se llama tamiben a itemTapped e intente elegir esta cancion 
    
    //Recreo el array menos el objeto que quiero quitar (la pagina se actualizara)
    this.items = this.items.filter(obj => obj !== item);
    
    //Elimino del storage el trackId seleccionado
    this.servicioListaFavoritos.itemDelete(item.id);

  }

} // Fin class ListPage
