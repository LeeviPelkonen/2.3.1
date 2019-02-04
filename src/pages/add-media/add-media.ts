import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';

@IonicPage()
@Component({
  selector: 'page-add-media',
  templateUrl: 'add-media.html',
})

export class AddMediaPage {

  title = '';
  description = '';
  filedata = '';
  file;
  loading = false;
  @ViewChild('mediaForm') mediaForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMediaPage');
  }

  uploadMedia() {
    //show spinner
    this.loading = true;
    const fd = new FormData();
    fd.append('title',this.title);
    fd.append('description',this.description);
    fd.append('file',this.file);
    this.mediaProvider.uploadMedia(fd).subscribe(
      (response: any) => {
        console.log(response);
        setTimeout(() => {
          this.wait();
        }, 2000, false);
      },
      error => {
        this.loading = false;
        console.log(error);
      });
  }

  wait(){
    this.loading = false;
    this.mediaForm.reset();
    this.navCtrl.pop().catch();
  }

  handleChange($event) {
    this.file = $event.target.files[0];
    this.showPreview()
  }

  showPreview() {
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      console.log(reader.result);
      this.filedata = reader.result;
    };

    if (this.file.type.includes('video')){
      this.filedata ='http://via.placeholder.com/500x200/000?text=video';
    } else if (this.file.type.includes('audio')){
      this.filedata ='http://via.placeholder.com/500x200/000?text=audio';
    } else {
      reader.readAsDataURL(this.file);
    }
  }
}
