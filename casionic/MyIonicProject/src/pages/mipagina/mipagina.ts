import { Component } from '@angular/core';
import { Persona } from '../../app/persona.model';
import { PersonaService } from '../../app/persona.service';

@Component({
  selector: 'mipagina',
  templateUrl: 'mipagina.html',
  providers: [PersonaService]       //Array de servicios que se utilizan
})
export class MiPagina {
  
  //Variables globales a este componente
  peso: number;
  altura: number;
  imc: number;
  persona: Persona;

  constructor(persona_service: PersonaService) {  //Declaro el servicio que voy luego a usar
    //Inicializo las variables
    this.peso=94;
    this.altura=1.80;
    //this.persona = new Persona("Angel", this.altura, this.peso);
    this.persona = persona_service.getPersona();  //Llamo al servicio para obtener este dato
  }

  calculaIMC() {
  //Calcula el indice de masa corporal
    let resultado: number = this.peso/this.altura/this.altura;
    console.log("IMC " + resultado);
    this.imc = Math.floor(resultado); 
  }
}
