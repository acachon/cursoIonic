import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';


import { PantallaInicio } from '../pages/0.pantallaInicio/PantallaInicio';
import { ListPage } from '../pages/list/list';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { BuscadorItunes } from '../pages/1.BuscadorItunes/BuscadorItunes';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    PantallaInicio,
    ItemDetailsPage,
    ListPage, 
    BuscadorItunes,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PantallaInicio,
    ItemDetailsPage,
    ListPage,
    BuscadorItunes,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
