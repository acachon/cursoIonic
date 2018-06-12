import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { Persona } from '../../app/CalculaIMC.model';
import { PersonaService } from '../../app/CalculaIMC.service';


@Component({
  selector: 'CalculaIMC',
  templateUrl: 'CalculaIMC.html',
  providers: [PersonaService]       //Array de servicios que se utilizan
})
export class CalculaIMC {
  
  //Atributos globales a este componente, a esta clase
  private imc: number;              //Se usa para pasar la solcuion y mostrar en la pagina el resultado del IMC
  private persona: Persona;         //Los campos peso y altura de la pagina estan ligados a esta variable
  private persona_cargada : boolean;//Flag indicando que ya se ha recibido esta llamada y se puede visualizar en la pagina

  /*
  private persona : Persona;            //Resultado de la busqueda indivudal
  private lista_personas : Persona[];   //Resultado de la busqueda colectivo    
  private peso : number;                
  private estatura : number;
  private resultado : number;           
  */




  constructor(persona_service: PersonaService, private alertCtrl: AlertController) {  //Declaro los servicios que  luego uso
    //Distintos modos de actualizar los inputs para el calculo del IMC
    
    //1. Estaticamente, mediante el constructor
    //this.persona = new Persona("Angel", 1.80, 90);

    //2. Mediante un servicio simulado, ya que el servicio tiene los datos hard-coded (1.80, 85) 
    this.persona = persona_service.getPersona();
    
    //3. Remotamente, seleccionando los inputs de un servicio web externo
    //En este caso se solicitan a una BBDD del servidor del profe, 
    //o simulada con un servidor en mi GitHub ("Angel", 1.80, 94)
    //Solo hay declarado un listener para cuando todo va bien
    persona_service.getPersonaHttp().subscribe 
    (ok => this.consumirRespuestaPersona (ok));


  }

  consumirRespuestaPersona ( ok : any)
  //Callback que procesa la respuesta del servicio getPersonaHttp()
  //Muestra un alert con un mensaje. Necesita imporatar la clase externa AlertController
  {
    //Casting de la respuesta
    this.persona = <Persona> ok;    //Hago el casting de la respuesta recibida (que era any)
    
    //this.showAlert();             //Llamo a la funcion que muestra el pop-up
    this.persona_cargada = true;    //Actualizo el flag indicando que ya he cargado una persona
      console.log ("Persona: " + this.persona.nombre + " " + this.persona.peso + " " + this.persona.altura);
    
    //No devuelve nada. Actualizando el flag y la clase global persona donde guardo la respuesta ok
  }



  calculaIMC() {
  //Calcula el indice de masa corporal en base a los campos rellenos
    let resultado: number = this.persona.peso/this.persona.altura/this.persona.altura;
    console.log("IMC " + resultado);
    this.imc = Math.floor(resultado); 
  }
}
