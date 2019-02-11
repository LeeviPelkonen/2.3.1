import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, Pic, Tag, User, UsernameStatus } from '../../interface/pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  loggedIn = false;
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

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })};
    return this.http.post<LoginResponse>(this.mediaPath + 'login/', user, httpOptions);
  }

  getUsername(username: string) {
    return this.http.get<UsernameStatus>(this.mediaPath + 'users/username/' + username);
  }

  getUser() {
    console.log('getting user');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })};
    return this.http.get<User>(this.mediaPath + 'users/user/', httpOptions);
  }

  getTags(tag: string) {
    console.log('getting tags');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })};
    return this.http.get<Tag[]>(this.mediaPath + 'tags/' + tag, httpOptions);
  }

  register(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })};
    return this.http.post<LoginResponse>(this.mediaPath + 'users/', user, httpOptions);
  }

  uploadMedia(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })};
    return this.http.post<any>(this.mediaPath + 'media/',data, httpOptions);
  }

  getUploader(userId:any) {
    console.log('getting uploader');
    const httpOptions = {
    headers: new HttpHeaders({
      'x-access-token': localStorage.getItem('token')
    })};
    return this.http.get<any>(this.mediaPath + 'users/' + userId, httpOptions);
  }
}
