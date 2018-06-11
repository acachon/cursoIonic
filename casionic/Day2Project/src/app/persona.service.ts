import { Injectable } from "@angular/core";
import { Persona } from "./persona.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

/**
 * Servicio que nos proporciona
 * información de una persona
 * 
 * 
 *         //Llamo al servicio iTunes con esta cadena de busqueda
        const servicio = "https://itunes.apple.com/search?";
        var busqueda = "";
        var parametros = "term=" + cadenaBuscada + "&media=music&limit=20";
        
        //configuro la url de busqueda, la llamada al API de iTunes
        busqueda= servicio + parametros;

        //Cuando se reciba la respuesta se actualiza el listado
        miAjaxGet(busqueda,function(respuesta){
            var aux = JSON.parse(respuesta);        //Variable intermedia con el resultado de Tunes
            listaBuscada = aux.results;               //El objeto es solo la lista de canciones
            actualizaListado(listaBuscada);         //Callback actualizaListado()
        });
 * 
 * 
 * 
 * 
 */
@Injectable()
export class PersonaService {

    static URL_SERVICIO_PERSONAS : string = "http://10.1.2.10:8080/appwebprofe/GetPersona";
    static URL_SERVICIO_LISTA_PERSONAS : string = "http://10.1.2.10:8080/appwebprofe/GetListaPersonas";
    static URL_SERVICIO_iTUNES : string = "https://itunes.apple.com/search?";

    constructor( private http : HttpClient)
    {

    }

    getitunesHttp(cadenaBuscada: string): Observable<Canciones[]>{

        let listado : Observable<Canciones[]>;
        let urlBusqueda: string = "term=" + cadenaBuscada + "&media=music&limit=20";
        urlBusqueda= PersonaService.URL_SERVICIO_iTUNES + urlBusqueda;

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

        return persona;

    }

}