import { Component } from '@angular/core';

import { Cancion } from '../../app/BuscadorItunes.model';
import { BuscadorService } from '../../app/BuscadorItunes.service';

@Component({
  selector: 'BuscadorItunes',
  templateUrl: 'BuscadorItunes.html',
  providers: [BuscadorService]
})
export class BuscadorItunes {

  //Variables globales al componente
  private lista_canciones : Cancion[];   //Resultado de la busqueda de canciones en itunes
  private selector : string;            //Valor seleccionado de la lista de canciones
  private busqueda : string;            //Cadena introducida en la pagina para el texto a buscar
  private titulo : string;              //Almaceno el titulo
  private autor : string;               //Almaceno el autor
  private audio : string;               //Almaceno el audio
  private trackId : number;             //Almaceno el ID oculto de la cancion
  private opcion : string;              //Almaceno el audio             
  private caratula : string;            //Almaceno la caratula

  constructor(private servicioBusquedaItunes : BuscadorService) {
  //Inicializo variables de la pagina
    this.caratula = "assets/imgs/logo.png";     //Foto por defecto mientras no se seleccione ninguna de la lista
  }

  buscaListado(){
  //Llamo al servicio de itunes para buscar el texto seleccionado
    this.servicioBusquedaItunes.getitunesHttp(this.busqueda).subscribe
    (listaCancionesok => this.consumirRespuestaListaCanciones(listaCancionesok));
  }

  consumirRespuestaListaCanciones ( listaCancionesok : any){
  //Callback que procesa la respuesta del servicio getitunesHttp()
  //Muestra los atributos de cada elemento que contnga la respuesta (array de Persona)

    //Casting de la respuesta
    this.lista_canciones = <Cancion[]> listaCancionesok.results;       
        console.log("ListaCancionesok = " + listaCancionesok.resultCount);
    
    //Muestro por consola los elementos de la lista
    for (let index in this.lista_canciones){
        console.log(this.lista_canciones [index]); 
    }
  }

  actualizaFicha(){
  //Actualizo la ficha en funcion de lo seleccionado en el listado desplegable

    //Actualizo la ficha
    this.titulo = this.lista_canciones[this.selector].trackName; 
    this.autor = this.lista_canciones[this.selector].artistName;
    this.audio = this.lista_canciones[this.selector].previewUrl;
    this.caratula = this.lista_canciones[this.selector].artworkUrl100;
  }
}
