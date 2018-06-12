export class Persona {  //Tiene que ser una clase (y no solo un interfaz porque tiene una funcion (metodo)

    nombre : string;
    estatura : number;
    peso : number;

    constructor (nombre : string, estatura : number, peso : number)
    //Le defino un constructor para realizar alguna funcion en esta clase
    {
        this.nombre = nombre;
        this.estatura = estatura;
        this.peso = peso;
    }
}

export interface Cancion {  //Lo defino como interfaz porque ocupa menos, y no necesita ningun metodo
    //Clase utilizada por la pagina de itunes al hacer una busqueda
    //Nos interesan: artisName (cantante), artworkUrl100 (portada), isStreamable (tiene auido)
    //trackName (cancion), trackViewUrl (audio)
    artistId:           number;     //1179227
    artistName:         string;     //"The Kinks"
    artistViewUrl:      string;     //"https://itunes.apple.com/us/artist/the-kinks/1179227?uo=4"
    artworkUrl30:       string;     //"https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/f3/bc/37/f3bc375b-7803-64ac-97b7-7d7c95f17300/source/30x30bb.jpg"
    artworkUrl60:       string;     //"https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/f3/bc/37/f3bc375b-7803-64ac-97b7-7d7c95f17300/source/60x60bb.jpg"
    artworkUrl100:      string;     //"https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/f3/bc/37/f3bc375b-7803-64ac-97b7-7d7c95f17300/source/100x100bb.jpg"    
    collectionCensoredName:string;  // "Lola Versus Powerman and the Moneygoround, Pt. One"
    collectionExplicitness:string;  //"notExplicit"
    collectionId:       number;       //1142251081
    collectionName:     string;       //"Lola Versus Powerman and the Moneygoround, Pt. One"
    collectionPrice:    number;       //11.99
    collectionViewUrl:  string;       //"https://itunes.apple.com/us/album/lola-coca-cola-version/1142251081?i=1142251087&uo=4"
    country:            string;       //"USA"
    currency:           string;       //"USD"
    discCount:          number;       //1
    discNumber:         number;       //1
    isStreamable:       boolean;      //true
    kind:               string;       //"song"
    previewUrl:         string;       //"https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview71/v4/bd/48/51/bd4851fe-5393-cfc2-20c7-bfe2c6e8ae7d/mzaf_1557495018102159536.plus.aac.p.m4a"
    primaryGenreName:   string;       //"Rock"
    releaseDate:        string;       //"1970-06-12T07:00:00Z"
    trackCensoredName:  string;       //"Lola ("Coca Cola" Version)"
    trackCount:         number;       //16
    trackExplicitness:  string;       //"notExplicit"
    trackId:            number;       //1142251087
    trackName:          string;       //"Lola ("Coca Cola" Version)"
    trackNumber:        number;       //5
    trackPrice:         number;       //0.69
    trackTimeMillis:    number;       //241040
    trackViewUrl:       string;       //"https://itunes.apple.com/us/album/lola-coca-cola-version/1142251081?i=1142251087&uo=4"
    wrapperType:        string;       //"track"
}