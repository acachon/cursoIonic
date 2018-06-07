import { Injectable } from "@angular/core";
import { Persona } from "./persona.model";
@Injectable()
/*
Este servicio realmente no ataca a un servidor
Estoy emulando el que hubiera un servicio que devolviera datos
*/
export class PersonaService {
    constructor(){}

    getPersona() : Persona {
        let miPersona: Persona;
        //Aqui ir'ia un AJAX para recuperar alguna info de un servidor
        //Pero aqui va hard-coded
        miPersona = new Persona("Angel", 1.80, 85);

        return miPersona;
    }

}