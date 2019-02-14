import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from "@angular/common/http";
import { MediaProvider } from '../providers/media/media';
import { MenuPage } from '../pages/menu/menu';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { ProfilePage } from '../pages/profile/profile';
import { ThumbnailPipe } from "../pipes/thumbnail/thumbnail";
import { AddMediaPage } from "../pages/add-media/add-media";
import { Chooser } from "@ionic-native/chooser";
import { PlayerPage } from "../pages/player/player";
import { PinchZoomModule } from "ngx-pinch-zoom";
import { MyFilesPage } from "../pages/my-files/my-files";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    LoginRegisterPage,
    ProfilePage,
    ThumbnailPipe,
    AddMediaPage,
    PlayerPage,
    MyFilesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    [PinchZoomModule]
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    LoginRegisterPage,
    ProfilePage,
    AddMediaPage,
    PlayerPage,
    MyFilesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider,
    Chooser
  ]
})
export class AppModule {
}
