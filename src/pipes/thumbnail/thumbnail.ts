import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interface/pic';
import { HttpClient } from '@angular/common/http';
import { rejects } from 'assert';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
  //pure: false
})
export class ThumbnailPipe implements PipeTransform {
  //thumbnail = '';
  private cachedId;
  constructor(private mediaProvider: MediaProvider){
  }

  transform(id: number, ...args){
    //the pure version
    return new Promise((resolve, reject) =>{
      this.mediaProvider.getSingleMedia(id).subscribe((res:Pic) =>{
        switch (args[0]) {
          case 'large':
            resolve(res.thumbnails.w640);
            break;
          case 'medium':
            resolve(res.thumbnails.w320);
            break;
          case 'screenshot':
            resolve(res.screenshot);
            break;
          default:
            resolve(res.thumbnails.w160);
        }
      });
    });

    /** the inpure wersion----------------------
    //this.mediaProvider.getSingleMedia(id).subscribe((res: Pic) =>)
    if(id !== this.cachedId){
      this.thumbnail = null;
      this.cachedId = id;
      this.mediaProvider.getSingleMedia(id).subscribe(res => {
        switch (args[0]) {
          case 'large':
            this.thumbnail = res.thumbnails["w640"];
            break;
          case 'medium':
            this.thumbnail = res.thumbnails["w320"];
            break;
          case 'screenshot':
            this.thumbnail = res.screenshot;
            break;
          default:
            this.thumbnail = res.thumbnails["w160"];
        }
      });
    }
    return this.thumbnail;
   */
  }
}
