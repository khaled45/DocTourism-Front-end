import { Component, OnInit, HostListener } from '@angular/core';


@Component({
  selector: 'app-welecome',
  templateUrl: './welecome.component.html',
  styleUrls: ['./welecome.component.scss']
})


export class WelecomeComponent implements OnInit {

  isShow: boolean;
  topPosToStartShowing = 100;

  scrHeight: any;
  scrWidth: any;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight + "px";
    this.scrWidth = window.innerWidth + "px";
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

  constructor() { }

  ngOnInit(): void {
  }


  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
