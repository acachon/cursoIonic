import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

import { Persona } from "./BuscadorItunes.model";
import { Cancion } from "./BuscadorItunes.model";



@Injectable()
export class PersonaService {

    //static URL_SERVICIO_PERSONAS : string = "http://10.1.2.10:8080/appwebprofe/GetPersona";
    //static URL_SERVICIO_LISTA_PERSONAS : string = "http://10.1.2.10:8080/appwebprofe/GetListaPersonas";
   
    static URL_SERVICIO_PERSONAS : string = "https://my-json-server.typicode.com/acachon/myServer/profile";
    static URL_SERVICIO_LISTA_PERSONAS : string = "https://my-json-server.typicode.com/acachon/myServer/personas";
    

    constructor( private http : HttpClient)
    {

    }
    
    getitunesHttp(cadenaBuscada: string): Observable<Cancion[]>{

        //Listado de canciones a devolver
        const URL_SERVICIO_iTUNES : string = "https://itunes.apple.com/search?";
        let listado : Observable<Cancion[]>; 

        //construyo los parametros para la llamada al servicio de itunes
        let urlBusqueda: string = "term=" + cadenaBuscada + "&media=music&limit=20";
        urlBusqueda= URL_SERVICIO_iTUNES + urlBusqueda;

        //Llamo al servicio de itunes
        listado = this.http.get<Cancion[]>(urlBusqueda);

        return listado; 
    }


    getListaPersonasHttp (): Observable<Persona[]>
    {
        let lista_persona_remota : Observable<Persona[]>;

            lista_persona_remota = this.http.get<Persona[]> 
            (PersonaService.URL_SERVICIO_LISTA_PERSONAS);
            
       
        return lista_persona_remota;

    }
    getPersonaHttp (): Observable<Persona>
    {
        let persona_remota : Observable<Persona>;

            persona_remota = this.http.get<Persona> (PersonaService.URL_SERVICIO_PERSONAS);
       
        return persona_remota;
    }

    getPersona () : Persona
    {
        let persona : Persona;

            persona = new Persona ("Juan", 1.90, 80);
            //let personaJSON: string = JSON.stringify(persona);

        return persona;

    }

}