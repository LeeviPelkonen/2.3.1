import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoginResponse, User, UsernameStatus } from '../../interface/pic';
import { HomePage } from '../home/home';
import { FormBuilder } from '@angular/forms';

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

  user: User = { username: null };
  registering = false;
  private passCheck: string;
  private usernameCheck = true;
  private passMatch = true;
  @ViewChild("registerForm") registerForm;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public mediaProvider: MediaProvider,
    private fb: FormBuilder
  ) {

  }
  ionViewWillEnter() {

  }

  login() {
    this.mediaProvider.login(this.user).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        this.mediaProvider.loggedIn = true;
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user.user_id.toString());
        this.navCtrl.push(HomePage);
      },
      error => {
        console.log(error);
      });
  }
  register() {
    if(this.usernameCheck && this.passMatch){
      this.mediaProvider.register(this.user).subscribe(
        (response: LoginResponse) => {
          console.log(response);
          this.login()
        },
        error => {
          console.log(error);
        });
    }else{
      this.presentAlert('please fix form before registering!')
    }
  }
  getUsername() {
    this.mediaProvider.getUsername(this.user.username).subscribe(
      (response: UsernameStatus) => {
        console.log(response);
        console.log(this.registerForm);
        if(response.available){
          this.usernameCheck = true;
        }else{
          this.registerForm.form.controls['username'].setErrors({'incorrect': true});
          this.usernameCheck = false;
        }
      },
      error => {
        console.log(error);
      });
  }
  checkPass() {
    this.passMatch = this.user.password == this.passCheck;
  }
  presentAlert(message:string) {
    const alert = this.alertCtrl.create({
      title: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
