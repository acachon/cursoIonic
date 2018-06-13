import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PantallaInicio } from '../pages/0.pantallaInicio/PantallaInicio';
import { ListPage } from '../pages/list/list';
import { BuscadorItunes } from '../pages/1.BuscadorItunes/BuscadorItunes';
import { CalculaIMC } from '../pages/2.CalculaIMC/CalculaIMC';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make PantallaInicio the root (or first) page
  rootPage = PantallaInicio;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Inicio', component: PantallaInicio },
      { title: 'Lista (template)', component: ListPage },
      { title: 'Calcula IMC', component: CalculaIMC },
      { title: 'Buscador iTunes', component: BuscadorItunes }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
