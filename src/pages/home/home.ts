import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pic } from '../../interface/pic';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: Pic[] = [];
  mediaPath = 'http://media.mw.metropolia.fi/wbma/media/';
  constructor(public navCtrl: NavController, private http: HttpClient) {
  }

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.http.get<Pic[]>(this.mediaPath).subscribe(
      (res: Pic[]) => {
        this.picArray = res;
        this.picArray.forEach(element => {
          const split = element.filename.split('.');
          element.filename = split[0];
        });
      },
            (error) => {
        console.log(error);
      }
    );
  }
}
