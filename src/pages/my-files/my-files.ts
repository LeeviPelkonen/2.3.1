import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pic, Tag } from "../../interface/pic";
import { MediaProvider } from "../../providers/media/media";
import { PlayerPage } from "../player/player";
import { Observable } from "rxjs";

/**
 * Generated class for the MyFilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-files',
  templateUrl: 'my-files.html',
})
export class MyFilesPage {
  pic: Observable<Pic[]>;

  constructor(public navCtrl: NavController, private mediaProvider: MediaProvider) {
  }

  ionViewDidEnter() {
    this.getAllFiles();
  }

  getAllFiles() {
    this.pic = this.mediaProvider.getMyFiles();
  }

  viewMedia(id: string) {
    this.navCtrl.push(PlayerPage, {
      Id: id
    });
  }

  takeFilters(des:string){
    return des.split('{',1)
  }

  modify(id:string){

  }

  deleteMedia(id:string){
    this.mediaProvider.deleteFile(id).subscribe((res => {
      console.log(res);
    });
    this.getAllFiles();
  }
}
