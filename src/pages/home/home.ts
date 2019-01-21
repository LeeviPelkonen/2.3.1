import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interface/pic';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: Pic[] = [];

  constructor(public navCtrl: NavController, private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    this.getAllFiles();
  }

  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe(
      (res: Pic[]) => {
        res.forEach(element => {
          this.mediaProvider.getSingleMedia(element.file_id).subscribe((item: Pic) => {
            this.picArray.push(item);
          });
        });
      }
    );
  }
}
