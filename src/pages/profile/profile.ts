import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { Pic, Tag, User } from '../../interface/pic';
import { Observable } from 'rxjs';
import { MyFilesPage } from "../my-files/my-files";

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
  imageId: Observable<Pic>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewWillEnter() {
    this.getProfile();
  }

  getProfile(){
    this.userProfile = this.mediaProvider.getUser();
    return new Promise((resolve, reject) => {
      this.mediaProvider.getTags("profile").subscribe((response: Tag[]) => {
        function filterTag(imgTag: Tag) {
          return imgTag.user_id == localStorage.getItem("user_id");
        }
        let tagArray = response.filter(filterTag);
        if(tagArray.length > 0) {
          this.imageId = this.mediaProvider.getSingleMedia(tagArray[0].file_id);
        }
      });
    });
  }
  logout(){
    localStorage.clear();
    this.mediaProvider.loggedIn = false;
    this.navCtrl.push(HomePage);
    this.imageId = null;
  }

  myFiles(){
    this.navCtrl.push(MyFilesPage);
  }
}
