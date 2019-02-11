import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from "../../providers/media/media";
import { Observable } from "rxjs";
import { Pic, User } from "../../interface/pic";

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {
  Id: string;
  url = 'http://media.mw.metropolia.fi/wbma/uploads/'
  item: Pic;
  uploader: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
  }

  ionViewDidEnter() {
    this.getMedia();

  }

  getMedia() {
    this.Id = this.navParams.get('Id');
    this.mediaProvider.getSingleMedia(this.Id).subscribe(mediaFile => {
      this.item = mediaFile;
      this.mediaProvider.getUploader(mediaFile.user_id).subscribe(user => {
        this.uploader = user.username;
      })
    });
  }


}
