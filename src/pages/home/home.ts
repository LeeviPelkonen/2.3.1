import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interface/pic';
import { Observable } from "rxjs";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: Observable<Pic[]>;

  constructor(public navCtrl: NavController, private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    this.getAllFiles();
    console.log('ionViewWillEnterS LoginRegisterPage');
    if (localStorage.getItem("token") != null && this.mediaProvider.loggedIn == false) {
      this.mediaProvider.getUser().subscribe(
        res => {
          this.mediaProvider.loggedIn = true;
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getAllFiles() {
    this.picArray = this.mediaProvider.getAllMedia()
  }
}
