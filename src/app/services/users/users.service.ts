import { Injectable } from '@angular/core';
import { api } from '../api-script-url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: any;
  constructor(public http: HttpClient) { this.url = api.url}

  getUsers() {
    return this.http.get(`${this.url}user-get`);
  } 
  deletetUser(email) {
    return this.http.delete(`${this.url}user-delete/${email}`);
  } 
  saveUser(email,password) {
    let user = {email:email,password:password}
    return this.http.post(`${this.url}user-save/`,user);
  }
}
