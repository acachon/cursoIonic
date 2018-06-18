import { Injectable } from "@angular/core";

import { Cancion } from "./MisFavoritos.model";
import { Storage } from '@ionic/storage';

@Injectable()
export class MisFavoritos {
//Servicio para gestionar los favoritos de itunes en tu app
    //Variables locales al servicio
    private misFavoritos: Cancion[];            //Array de canciones favoritas
    
    //Constructor e inicializacion del servicio
    //-----------------------------------------//

    constructor(public storage: Storage )
    {

    }
    
    //Funciones y metodos del servicio
    //-----------------------------------------//

    public itemsRefresh(): any { 
    //Recupera del storage el listado de canciones favoritas
    //Salida: devuelve una promesa con el array de canciones
        return this.storage.get("favoritosDB").then((val) =>
        {
            var listado=val;
            return listado;
        });
    }

    public itemDelete(miTrackId: number) { 
    //Elimina miCancion del storage
    //Salida: nada 
        //Recupero el listado guardado en storage para eliminar la elegida
        //Elimino la elegida y lo vuelvo a guardar
        this.itemsRefresh().then((val) => {
            if (val==null){               //Si no existe (vacio ya) inicializo misFavoritos
                this.misFavoritos=undefined;
            }else{
                this.misFavoritos=val;
                console.log("Antes tenias " + val.length + " canciones favoritas" );
            
                //Filtro el elemento que se ha elegido elinminar (identificado por su trackId)
                this.misFavoritos = this.misFavoritos.filter(obj => obj.trackId !== miTrackId);
            
                //Vuelvo a almacenar el listado de favoritos completo (ya sin miTrackId) 
                this.storage.set("favoritosDB", this.misFavoritos);
                console.log("Eliminada en fichero: " + miTrackId);
                console.log("Ahora tienes " + this.misFavoritos.length + " favoritos, solo.");
            }  
        });
    }

    public itemAdd(miCancion: Cancion) {  
    //Almaceno miCancion en el listado de favortios en storage (en favoritosDB)
    //Entrada: se le pasa un objeto Cancion (definicion en Mis Favoritos.model.ts)
    //Salida: nada

        //Variables locales
        //let salida:  Cancion[];
        console.log("Añadir a favoritos");
        console.log("Cancion: "+ miCancion.trackName);

        //Guardo el valor del titulo seleccionado
        if (miCancion===undefined){
            console.log("Cancion vacia");

        }else{
            //Recupero el listado guardado en storage (favoritosDB) para incluir la nueva
            //Actualizo el fichero en esta misma promesa
            this.storage.get("favoritosDB").then((val) => {

                //Cargo en misFavoritos el contenido de este array en al base de datos favortiosDB
                //Y agrego la nueva cancion al final del array
                if (val==null){                     
                    this.misFavoritos=[miCancion];
                }else{
                    console.log("Ya tenias " + val.length + " canciones favoritas" );
                    this.misFavoritos=val;
                    
                    //Reviso que no este repetido
                    let flag=true;
                    for (let i=0;i<this.misFavoritos.length;i++){
                        if (this.misFavoritos[i].trackId==miCancion.trackId){
                            console.log("Cancion ya existente en favoritos");
                            flag=false;
                            break;
                        }
                    }
                    //Si ya esta en los favoritos no vuelvo a meterla
                    if (flag) {this.misFavoritos[val.length]=miCancion}
                }
        
                //Actualizo el fichero storage donde guardo la lista de canciones
                this.storage.set("favoritosDB", this.misFavoritos);
                console.log("Fichero storage actualizado con: " + miCancion.artistName)
            });
        }
    }
}