import { Component } from '@angular/core';
import { Persona, Cancion } from '../../app/persona.model';
import { PersonaService } from '../../app/persona.service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'mipagina',
  templateUrl: 'mipagina.html',
  providers: [PersonaService]
})
export class MiPagina {

  private persona : Persona;            //Resultado de la busqueda indivudal
  private lista_personas : Persona[];   //Resultado de la busqueda colectivo  
  private lista_canciones : Cancion[];   //Resultado de la busqueda de canciones en itunes  
  private peso : number;                
  private estatura : number;
  private resultado : number;           
  private persona_cargada : boolean;    //Flag indicando que ya se ha recibido esta llamada y se puede visualizar en la pagina
  private selector : string;            //Valor seleccionado de la lista de canciones
  private busqueda : string;            //Cadena introducida en la pagina para el texto a buscar             

  constructor(private persona_service : PersonaService, 
    private alertCtrl: AlertController) {

    //Llamo al servicio que me devuelve una lista de personas
    this.persona_service.getListaPersonasHttp().subscribe
    (listaok => this.consumirRespuestaListaPersonas(listaok));
   
    //Llamo al servicio que me deveulve una persona con sus atributos
    persona_service.getPersonaHttp().subscribe 
    (ok => this.consumirRespuestaPersona (ok));


  }

  buscaListado(){
  //Llamo al servicio de itunes para buscar el texto seleccionado
    //Llamo al servicio que me devuelve una lista de canciones
    this.persona_service.getitunesHttp(this.busqueda).subscribe
    (listaCancionesok => this.consumirRespuestaListaCanciones(listaCancionesok));
  }

  consumirRespuestaListaCanciones ( listaCancionesok : any)
  //Callback que procesa la respuesta del servicio getitunesHttp()
  //Muestra los atributos de cada elemento que contnga la respuesta (array de Persona)
  {
    //Casting de la respuesta
    this.lista_canciones = <Cancion[]> listaCancionesok;       
        console.log("ListaCancionesok = " + listaCancionesok);
    
    //Muestro por consola los elementos de la lista
    for (let index in this.lista_canciones){
      console.log(this.lista_canciones [index]); 
    }
  }

  mostrarPersona (persona:  Persona) : void
  //Muestra por consola los atributos del objeto Persona que se le pasa
  //No devuelve nada
  {
      console.log ("Nombre " + persona.nombre);
      console.log ("Peso " + persona.peso);
      console.log ("Estatura " + persona.estatura);
  } 

  consumirRespuestaListaPersonas ( listaok : any)
  //Callback que procesa la respuesta del servicio getListaPersonasHttp()
  //Muestra los atributos de cada elemento que contnga la respuesta (array de Persona)
  {
    //Casting de la respuesta
    this.lista_personas = <Persona[]> listaok;            //Hago el casting de la var de entrada al array Persona[]
      console.log("Listaok = " + listaok);
    
      for (let index in this.lista_personas){
      this.mostrarPersona(this.lista_personas [index]); 
    }
  }

  consumirRespuestaPersona ( ok : any)
  //Callback que procesa la respuesta del servicio getPersonaHttp()
  // Muestra un alert con un mensaje, por eso se hace import y se declara en el constructor este servicio externo
  {
    //Casting de la respuesta
    this.persona = <Persona> ok;    //Hago el casting de la respuesta recibida (que era any)
    
    this.showAlert();               //Llamo a la funcion que muestra el pop-up
    this.persona_cargada = true;    //Actualizo el flag indicando que ya he cargado una persona

      console.log ("Persona: " + this.persona.nombre + " " + this.persona.peso + " " + this.persona.estatura);
  }

  showAlert() {
    const alert = this.alertCtrl.create({   //Creo un mensaje de alert
      title: 'He recibido una persona',
      subTitle: 'Esta persona, es ' + this.persona.nombre,
      buttons: ['OK', 'SI']               
    });                                     
    alert.present();                        //Muestro en pantalla el alert
  }

  actualizaFicha(){
  //Onchange del listado desplegable con la lista de personas
    //this.persona_seleccionada_index = miLista.selectedIndex;
    console.log ("Seleccionado: " + this.selector);
    console.log ("Texto buscado: " + this.busqueda);
    //this.busqueda="hola";     //Esto si cambia el mensaje escrito en la caja de texto
    //this.selector="Jose";   //Esto no cambia la seleccion manual hecha en el selector
  }

}
