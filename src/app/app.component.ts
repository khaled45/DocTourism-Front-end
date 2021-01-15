import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DoctorService } from './services/doctor.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private myelementRef: ElementRef, public myAuthService: AuthService, private myDoctorService: DoctorService) { }

  value = 'Doctourism.com@gmail.com'
  isChecked: any = true


  ngAfterViewInit(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff'
  }
  show = true;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (localStorage.getItem('type') == 'admin' || localStorage.getItem('type') == 'doctor') {
      this.show = false
    }
  }

  vactionMode() {

    this.myDoctorService.OnOffToggle({ activeChecked: !this.isChecked }).subscribe((resp: any) => {

      if (resp.message == 'success')
        window.alert('Vacation Mode is ' + this.isChecked)
    })
  }

  getUserType() {
    if (localStorage.getItem('type') == 'doctor')
      return true
    else
      return false
  }

}
