import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from "../../providers/media/media";
import { HomePage } from "../home/home";
import { User } from "../../interface/pic";
import { Observable } from "rxjs";

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userProfile: Observable<User>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewWillEnter() {
    this.getProfile();
  }

  getProfile(){
    this.userProfile = this.mediaProvider.getUser()
  }

  logout(){
    localStorage.clear();
    this.mediaProvider.loggedIn = false;
    this.navCtrl.push(HomePage);
  }
}
