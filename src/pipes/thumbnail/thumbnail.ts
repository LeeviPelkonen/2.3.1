import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from "../../providers/media/media";
import { Pic } from "../../interface/pic";

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {
  thumbnail = '';

  //cachedID: any;
  constructor(private mediaProvider: MediaProvider) {

  }

  /*
  transform(id: number, ...args) {
    if (this.cachedID !== id) {
      //this.thumbnail = null;
      this.cachedID = id;
      this.mediaProvider.getSingleMedia(id).subscribe((response: Pic) => {
        this.thumbnail = response.thumbnails.w160;
      });
      return this.thumbnail;
    }
  }
  */
  transform(id: number, ...args) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getSingleMedia(id).subscribe((response: Pic) => {
        switch (args[0]) {
          case 'large':
            resolve(response.thumbnails.w640);
            break;
          case 'medium':
            resolve(response.thumbnails.w320);
            break;
          case 'screenshot':
            resolve(response.screenshot);
            break;
          default:
            resolve(response.thumbnails.w160);
        }
      });
    });
  }
}
