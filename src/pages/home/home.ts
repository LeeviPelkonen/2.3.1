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

  ngOnInit() {
    this.getAllFiles();
  }
  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe(
      (res: Pic[]) => {
        this.picArray = res;
        this.picArray.forEach(element => {
          const split = element.filename.split('.');
          element.filename = split[0];
          element.thumbnails = {
            '160': split[0] + '-tn160.png'
          };
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
