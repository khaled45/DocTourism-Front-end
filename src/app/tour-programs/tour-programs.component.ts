import { Component, OnInit, ElementRef } from '@angular/core';
import { travelAgentService } from '../services/travel-agent.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tour-programs',
  templateUrl: './tour-programs.component.html',
  styleUrls: ['./tour-programs.component.scss']
})
export class TourProgramsComponent implements OnInit {
  Allprograms: any;
  recomended_programs: any = []
  location: any = this.myActivatedRoute.snapshot.paramMap.get('location')
  recommended: any = [];
  filterd_programs: any;
  treatment_id = this.myActivatedRoute.snapshot.paramMap.get('Did')
  constructor(private myRouter: Router, private myelementRef: ElementRef, private mytravelAgentService: travelAgentService, private myActivatedRoute: ActivatedRoute) { }
  arr = [1, 2, 3]

  ngOnInit(): void {
    this.getAllprograms()
  }

  ngAfterViewInit(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f2f2f2'
  }
  ngOnDestroy(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff'

  }

  getAllprograms() {
    this.mytravelAgentService.getAllprograms().subscribe((resp: any) => {
      this.Allprograms = resp.data
      this.recomended_programs = [...this.Allprograms]

    })
  }

  recommend_func() {
    this.recomended_programs = this.Allprograms.filter((val) => {
      debugger
      if (val.location == this.location)
        this.recommended.push(val)
    })
    this.recomended_programs = [...this.recommended]
    this.recommended = []

  }

  allprograms_func() {
    this.recomended_programs = [...this.Allprograms]
  }

  filterCat(type) {
    let filtered_programs = []
    this.recomended_programs.filter((val) => {
      debugger
      if (val.catygory == type) {
        filtered_programs.push(val)
      } else
        this.recomended_programs = this.Allprograms
    })

    this.recomended_programs = filtered_programs
  }


  directing(pid) {
    let tid = this.treatment_id
    this.myRouter.navigate(['programprofile', `${pid}`, `${tid}`])
  }


}
