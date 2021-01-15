import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isShow: boolean;
  topPosToStartShowing = 50;

  options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];
  validatingForm: FormGroup;
  validatingForm2: FormGroup;
  type: any;
  id: any
  hide = true;
  email: any
  username: any
  password: any
  phone: any
  gender: any
  age: any
  validError = false;
  alreadyRegester = false;
  invalidMail = false;


  constructor(public myAuthService: AuthService, private myrouter: Router) { }

  ngOnInit(): void {

  }


  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  register() {

    const {
      email,
      username,
      password,
      phone,
      gender,
      age
    } = this

    if (username && password && phone && gender && age) {

      this.myAuthService.P_register({ username, password, email, phone, gender, age }).subscribe((resp: any) => {
        console.log(resp)
        if (resp.token) {
          localStorage.setItem('token', resp.token)
          localStorage.setItem('type', resp.type)
          localStorage.setItem('id', resp.id)
          this.myrouter.navigate(['home']);
        }
        else if (resp.message = "error") {
          this.validError = true
        }
        else if (resp.message = "user already registered") {
          this.alreadyRegester = true
        }
        else {
          console.log("A7A")

        }
      })

    }
    else {
      this.validError = true
    }



  }

  login() {
    const { email, password } = this
    this.myAuthService.login({ email, password }).subscribe((resp: any) => {
      if (resp.token) {
        localStorage.setItem('token', resp.token)
        localStorage.setItem('type', resp.type)
        localStorage.setItem('id', resp.id)

        if (resp.type == 'patient') {
          this.myrouter.navigate(['home']);
        } else if (resp.type == 'doctor') {
          this.myrouter.navigate(['dashboard', localStorage.getItem('id')]);

        }
        else if (resp.type == 'travelAgent') {
          this.myrouter.navigate(['Tdashboard', localStorage.getItem('id')]);
          this.id = resp.id
        }
        else if (resp.type == 'admin') {
          this.myrouter.navigate(['admin']);
        }
        else {
          this.myrouter.navigate(['home']);
        }
      }
    })

  }

  myAccount() {

    if (localStorage.getItem('type') == 'patient') {
      this.myrouter.navigate(['Pdashboard', localStorage.getItem('id')]);
    }
    if (localStorage.getItem('type') == 'doctor') {
      this.myrouter.navigate(['dashboard', localStorage.getItem('id')]);
    }
    if (localStorage.getItem('type') == 'travelAgent') {
      this.myrouter.navigate(['Tdashboard', this.id]);
    }
    if (localStorage.getItem('type') == 'admin') {
      this.myrouter.navigate(['admin']);
    }
  }



  @HostListener('window:scroll')
  checkScroll() {

    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;


    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }



}

