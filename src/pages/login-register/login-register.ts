import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from "../../providers/media/media";
import { LoginResponse, User } from "../../interface/pic";
import { HomePage } from "../home/home";

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {

  user: User = {username: null};
  registering: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider
  ) {

  }
  ionViewWillEnter() {

  }

  login(){
    this.mediaProvider.login(this.user).subscribe(
      (response: LoginResponse)=> {
        console.log(response);
        this.mediaProvider.loggedIn = true;
        localStorage.setItem("token", response.token);
        this.navCtrl.push(HomePage);
      },
      error => {
      });
  }
  register(){
    this.mediaProvider.register(this.user).subscribe(
      (response: LoginResponse)=> {
        console.log(response);
        this.login()
      },
      error => {
        console.log(error);
      });
  }

}
