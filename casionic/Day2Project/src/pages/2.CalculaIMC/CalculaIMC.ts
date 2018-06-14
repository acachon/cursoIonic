//----------------//
//by Angel Cachon //
//----------------// 
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
  private lista_personas : Persona[];   //Resultado de la busqueda colectivo 

  
  constructor(persona_service: PersonaService, private alertCtrl: AlertController) {  //Declaro los servicios que  luego uso
    //Distintos modos de actualizar los inputs para el calculo del IMC
    
    //1. Estaticamente, mediante el constructor
    //this.persona = new Persona("Angel", 1.80, 90);

    //2. Mediante un servicio simulado, ya que el servicio tiene los datos hard-coded (1.80, 85) 
    this.persona = persona_service.getPersona();
    
    //3. Remotamente, seleccionando los inputs de un servicio web externo
    //En este caso se solicitan a una BBDD del servidor del profe, 
    //o simulada con un servidor en mi GitHub ("Angel", 1.80, 94)
    //Solo hay declarado un listener para cuando todo va bien (ok es Observable de Persona)
    persona_service.getPersonaHttp().subscribe 
    (ok => this.consumirRespuestaPersona (ok));

    //Llamo a otro servicio para recuperar un listado de personas
    //Esto no se usa en esta pagina pero conservo aqui el codigo
    //El servicio es emulado desde mi servidor gitHub con 3 personas
    //Llamo al servicio que me devuelve una lista de personas (listaok es Observable de Persona[])
    persona_service.getListaPersonasHttp().subscribe
    (listaok => this.consumirRespuestaListaPersonas(listaok));

  }

  consumirRespuestaPersona ( ok : any)
  //Callback que procesa la respuesta del servicio getPersonaHttp()
  //Muestra un alert con un mensaje. Necesita imporatar la clase externa AlertController
  {
    //Casting de la respuesta
    this.persona = <Persona> ok;    //Hago el casting de la respuesta recibida (que era any)

    this.persona_cargada = true;    //Actualizo el flag indicando que ya he cargado una persona

    //No devuelve nada. Actualizando el flag y la clase global persona donde guardo la respuesta ok
  }

  calculaIMC() {
  //Calcula el indice de masa corporal en base a los campos rellenos
    let resultado: number = this.persona.peso/this.persona.altura/this.persona.altura;
    this.imc = Math.floor(resultado); 
  }

  consumirRespuestaListaPersonas ( listaok : any)
  //Callback que procesa la respuesta del servicio getListaPersonasHttp()
  //Muestra los atributos de cada elemento que contnga la respuesta (array de Persona)
  {
    //Casting de la respuesta
    this.lista_personas = <Persona[]> listaok;            //Hago el casting de la var de entrada al array Persona[]
    
    //Muestro en pantalla el numero de registros recibidos
    this.showAlert()
    
    //Muestro por consola cada uno de los objetos recibidos 
    for (let index in this.lista_personas){
      console.log(this.lista_personas [index]); 
    }
  }

  showAlert() {
    //Funcion que muestra en pantalla un alert
    //Requiere el servicio externo AlertController 
      const alert = this.alertCtrl.create({   //Creo un mensaje de alert
        title: 'Datos recibidos',
        subTitle: 'El número de personas es: ' + this.lista_personas.length,
        buttons: ['OK', 'SI']               
      });                                     
      alert.present();                       //Muestro en pantalla el alert
    }
}
