import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { webpack } from "@ionic/app-scripts/dist/webpack";
import { Chooser } from "@ionic-native/chooser";

@IonicPage()
@Component({
  selector: 'page-add-media',
  templateUrl: 'add-media.html',
})

export class AddMediaPage {

  filters = {
    'brightness': 100,
    'saturation': 100,
    'sepia': 0,
    'contrast': 100,
  };
  title = '';
  description = '';
  filedata = '';
  file;
  loading = false;
  myBlob = new Blob;
  fileSelected = false;
  @ViewChild('mediaForm') mediaForm;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mediaProvider: MediaProvider,
              public loadingCtrl: LoadingController,
              private chooser: Chooser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMediaPage');

  }

  uploadMedia() {
    //show spinner
    this.loading = true;
    const fd = new FormData();
    fd.append('title',this.title);
    fd.append('description',this.description + JSON.stringify(this.filters));
    fd.append('file',this.myBlob);
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
  filterImage() {
    return { filter: `brightness(${this.filters.brightness}%) contrast(${this.filters.contrast}%) sepia(${this.filters.sepia}%) saturate(${this.filters.saturation}%)` };
  }

  wait(){
    this.loading = false;
    this.mediaForm.reset();
    this.fileSelected = false;
    this.navCtrl.pop().catch();
  }

  showPreview() {
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      console.log(reader.result);
      this.filedata = reader.result;
    };

    if (this.myBlob.type.includes('video')){
      this.filedata ='http://via.placeholder.com/500x200/000?text=video';
    } else if (this.myBlob.type.includes('audio')){
      this.filedata ='http://via.placeholder.com/500x200/000?text=audio';
    } else {
      reader.readAsDataURL(this.myBlob);
    }
  }

  fileChoose() {
    console.log('this is filechoose!');
    this.chooser.getFile( 'image/*,video/*,audio/*')
      .then(file => {
        console.log(file);
        this.myBlob = new Blob([file.data], {type: file.mediaType});
        this.fileSelected = true;
        this.showPreview()
      })
      .catch((error: any) => {
        console.error(error)
      });
  };

  resetAll(){
    this.loading = false;
    this.mediaForm.reset();
    this.fileSelected = false;
    this.filedata = '';
  }
}
