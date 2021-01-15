import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  readMore= false;
  Did = this.myActivatedRoute.snapshot.paramMap.get('id')
  DData: any;
  apiData: any;

  constructor(public myAuthService: AuthService, private myelementRef: ElementRef, private myActivatedRoute: ActivatedRoute, public myDoctorService: DoctorService) { }


  ngAfterViewInit(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff'
  }
  ngOnDestroy(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f3f7f3'

  }

  ngOnInit() {
    this.getDoctorProfile()
  }

  getDoctorProfile() {
    const { Did } = this

    this.myDoctorService.getDoctorProfile({ Did }).subscribe((resp: any) => {
      this.DData = resp.data

    })

  }

  ReadMore() {
    debugger
    if (this.readMore == false) {
      this.readMore = true
    } else {
      this.readMore = false
    }
  }

}
