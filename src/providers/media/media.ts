import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutoLoginResponse, LoginResponse, Pic, User } from '../../interface/pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  loggedIn: boolean = false;
  picArray: Pic[] = [];
  mediaPath = 'http://media.mw.metropolia.fi/wbma/';

  constructor(private http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }
  getAllMedia() {
    return this.http.get<Pic[]>(this.mediaPath + 'media/');
  }
  getSingleMedia(id: any) {
    return this.http.get<Pic>(this.mediaPath + 'media/' + id);
  }

  login(user: User){
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })};
    return this.http.post<LoginResponse>(this.mediaPath + 'profile/', user, httpOptions);
  }

  getTag(){
    console.log("getting tag");
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem("token")
      })};
    return this.http.get<any>(this.mediaPath + 'tags/', httpOptions);
  }

  getUser(){
    console.log("getting user");
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem("token")
      })};
    return this.http.get<AutoLoginResponse>(this.mediaPath + 'users/user/', httpOptions);
  }

  register(user: User){
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })};
    return this.http.post<LoginResponse>(this.mediaPath + 'users/', user, httpOptions);
  }
}
