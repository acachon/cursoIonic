import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

import { Persona } from "./CalculaIMC.model";

@Injectable()
/*
Este servicio realmente no ataca a un servidor
Estoy emulando el que hubiera un servicio que devolviera datos
*/
export class PersonaService {

    //Variable globales a la clase
    //-------------------------------//
    //Direcciones del servidor del profesor del curso
    //static URL_SERVICIO_PERSONAS : string = "http://10.1.2.10:8080/appwebprofe/GetPersona";
    //static URL_SERVICIO_LISTA_PERSONAS : string = "http://10.1.2.10:8080/appwebprofe/GetListaPersonas";
    
    //Direcciones del servidor emulado en mi GitHub
    static URL_SERVICIO_PERSONA : string = "https://my-json-server.typicode.com/acachon/myServer/profile";
    static URL_SERVICIO_LISTA_PERSONAS : string = "https://my-json-server.typicode.com/acachon/myServer/personas";

    constructor(private http : HttpClient){
        
    }

    getPersona() : Persona {
    //Servicio que emula que se conecta a una fuente pero realmente devuelve datos hard-coded
        let miPersona: Persona;
        //Aqui iría un AJAX para recuperar alguna info de un servidor.Pero aqui va hard-coded
        miPersona = new Persona("Angel", 1.80, 85);

        return miPersona;
    }

    getListaPersonasHttp (): Observable<Persona[]>{
    //Servicio que se conecta a un servidor que devuelve un objeto de tipo array de Personas
    //requiere importar la clase HttpClient (llamada tipo AJAX que devuelve un JSON)
        let lista_persona_remota : Observable<Persona[]>;
        
        lista_persona_remota = this.http.get<Persona[]> (PersonaService.URL_SERVICIO_LISTA_PERSONAS);
       
        return lista_persona_remota;
    }

    getPersonaHttp (): Observable<Persona>{
    //Servicio similar al anterior pero devulve un objeto Persona y no un array de Persona
        let persona_remota : Observable<Persona>;

            persona_remota = this.http.get<Persona> (PersonaService.URL_SERVICIO_PERSONA);
       
        return persona_remota;
    }

}