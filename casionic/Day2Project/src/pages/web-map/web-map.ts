import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

//Variables globales (no solo para esta clase)
//------------------------------------------//
declare var google;

@Component({
  selector: 'page-web-map',
  templateUrl: 'web-map.html',
  providers:[Geolocation]
})
export class WebMapPage {

  //Varaibles locales al componente
  //-------------------------------//
  map: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams  ,  // ){
              public geolocation: Geolocation) {
  }


  //Funcion que se ejecuta al cargar la pagina
  //-----------------------------------------//

  ionViewDidLoad(){
    this.getPosition();
    console.log ("pasa por ionViewDidLoad");
  }

  getPosition():any{
    this.geolocation.getCurrentPosition()
    .then(response => {
      console.log ("pasa por getCurrentposition response");
      this.loadMap(response);
    })
    .catch(error =>{
      console.log ("pasa por getCurrentposition ERRORAZO");
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    console.log ("pasa por loadMapa");
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }


}
