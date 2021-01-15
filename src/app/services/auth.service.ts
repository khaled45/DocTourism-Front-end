import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendURL = 'http://localhost:8085/patient/';
  IsHidden: Boolean

  constructor(private myHttpClient: HttpClient, private myRouter: Router) { }

  P_register(data) {
    return this.myHttpClient.post(this.backendURL + 'signUp', data)
  }

  d_register(data) {
    return this.myHttpClient.post('http://localhost:8085/doctor/' + 'signUp', data)
  }

  login(data) {
    return this.myHttpClient.post('http://localhost:8085/login/', data)
  }

  isLoggedin() {
    if (localStorage.getItem('type') == 'admin' || localStorage.getItem('type') == 'doctor' || localStorage.getItem('type') == 'travelAgent') {
      this.IsHidden = true
    }
    return !!localStorage.getItem('token');
  }


  logout() {
    this.IsHidden = false
    localStorage.removeItem('type')
    localStorage.removeItem('id')
    this.myRouter.navigate([''])
    return localStorage.removeItem('token')


  }

  getToken() {
    return localStorage.getItem('token')
  }

  getType() {
    return localStorage.getItem('type')
  }


}
