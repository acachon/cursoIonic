import { Component } from '@angular/core';
import { Persona } from '../../app/persona.model';
import { PersonaService } from '../../app/persona.service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'mipagina',
  templateUrl: 'mipagina.html',
  providers: [PersonaService]
})
export class MiPagina {

  private persona : Persona;
  private lista_personas : Persona[];
  private peso : number;
  private estatura : number;
  private resultado : number;
  private persona_cargada : boolean;
  private selector : string;
  private busqueda : string;             

  constructor(private persona_service : PersonaService, 
    private alertCtrl: AlertController) {
    this.estatura = 1.89;
    this.peso = 85;
    this.persona_cargada = false;
    //this.persona = persona_service.getPersona();// new Persona ("Judith", 1.70, 58);

    //Llamo al servicio que me deveulve una lista de personas
    persona_service.getListaPersonasHttp().subscribe
    (listaok => this.consumirRespuestaListaPersonas(listaok));
   
    //Llamo al servicio que me deveulve una persona con sus atributos
    persona_service.getPersonaHttp().subscribe 
    (ok => this.consumirRespuestaPersona (ok));
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
    this.lista_personas = <Persona[]> listaok;            //Hago el casting de la var de entrada al array Persona[]
    
      console.log("LP = " +this.lista_personas);
    for (let index in this.lista_personas){
      this.mostrarPersona(this.lista_personas [index]); 
    }
  }

  consumirRespuestaPersona ( ok : any)
  //Callback que procesa la respuesta del servicio getPersonaHttp()
  // Muestra un alert con un mensaje, por eso se hace import y se declara en el constructor este servicio externo
  {
    this.persona = <Persona> ok;    //Hago el casting de la respuesta recibida (que era any)
    this.showAlert();               //Llamo a la funcion que muestra el pop-up
    this.persona_cargada = true;    //Actualizo el flag indicando que ya he cargado una persona

      console.log ("Persona: " + this.persona.nombre + " " + this.persona.peso + " " + this.persona.estatura);
  }

  showAlert() {
    const alert = this.alertCtrl.create({   //Creo un mensaje de alert
      title: 'Ha venido una persona',
      subTitle: 'Esta persona, es Jose',
      buttons: ['OK', 'MOLA']               
    });                                     
    alert.present();                        //Muestro en pantalla el alert
  }

  calculaIMC() {
    this.persona_service;
    console.log ("Ha llamado a calcula IMC");
    let imc : number = 0;
    imc = this.persona.peso / (this.persona.estatura*this.estatura);
    console.log ("IMC " +  imc);
    this.resultado = imc;
  }

  actualizaFicha(){
  //Onchange del listado desplegable con la lista de personas
    //this.persona_seleccionada_index = miLista.selectedIndex;
    console.log (this.selector);
    console.log (this.busqueda);
    this.busqueda="hola";
    this.selector="Jose";
  }

}
