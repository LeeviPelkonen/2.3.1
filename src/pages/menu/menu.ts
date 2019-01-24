import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages
import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';
import { LogoutPage } from '../logout/logout';
import { MediaProvider } from "../../providers/media/media";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  tab1Root = HomePage;
  tab2Root = LoginRegisterPage;
  tab3Root = LogoutPage;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
