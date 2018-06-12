import { Component } from '@angular/core';
import { Persona } from '../../app/CalculaIMC.model';
import { PersonaService } from '../../app/CalculaIMC.service';

@Component({
  selector: 'CalculaIMC',
  templateUrl: 'CalculaIMC.html',
  providers: [PersonaService]       //Array de servicios que se utilizan
})
export class CalculaIMC {
  
  //Variables globales a este componente
  imc: number;
  persona: Persona;

  constructor(persona_service: PersonaService) {  //Declaro el servicio que voy luego a usar
    //Inicializo las variables mediante un servicio
    //this.persona = new Persona("Angel", this.altura, this.peso);
    this.persona = persona_service.getPersona();  //Llamo al servicio para obtener este dato
  }

  calculaIMC() {
  //Calcula el indice de masa corporal
    let resultado: number = this.persona.peso/this.persona.altura/this.persona.altura;
    console.log("IMC " + resultado);
    this.imc = Math.floor(resultado); 
  }
}
