export class Persona {
//Creo una clase peresona dentro de [app]
    nombre: string;
    altura: number;
    peso: number;

    //Creo un constructor de esta clase
    constructor (miNombre: string, miEstatura: number, miPeso: number){
        this.nombre=miNombre;
        this.altura=miEstatura;
        this.peso=miPeso;
    }

}