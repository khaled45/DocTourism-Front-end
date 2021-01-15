import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { travelAgentService } from '../services/travel-agent.service';
import { patientService } from '../services/patient.services';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-program-profile',
  templateUrl: './program-profile.component.html',
  styleUrls: ['./program-profile.component.scss']
})
export class ProgramProfileComponent implements OnInit {

  prog_id = this.myActivatedRoute.snapshot.paramMap.get('pid')
  tid = this.myActivatedRoute.snapshot.paramMap.get('tid')
  adult: any = 1
  children: any = 0
  i = 1
  j = 1
  programData: any;
  arrivelDate: any
  childrenCost: any
  adultCost: any
  treatment_data: any;

  constructor(config: NgbModalConfig, private myActivatedRoute: ActivatedRoute, private mytravelAgentService: travelAgentService, private mypatientService: patientService, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getProgram()
    debugger
  }

  plus(event) {
    if (event == 'a') {
      if (this.i != 100) {
        this.i++;
        this.adult = this.i
      }
    }
    if (event == 'c') {
      if (this.j != 100) {
        this.j++;
        this.children = this.j
      }
    }

  }

  minus(event) {
    if (event == 'a') {
      if (this.i != 1) {
        this.i--;
        this.adult = this.i
      }
    }
    if (event == 'c') {
      if (this.j != 0) {
        this.j--;
        this.children = this.j
      }
    }

  }

  getProgram() {
    this.mytravelAgentService.getprogram({ programID: this.prog_id }).subscribe((resp: any) => {
      this.programData = resp.data
      this.childrenCost = this.programData.cost.childrenCost
      this.adultCost = this.programData.cost.adultCost
    })
  }


  enrollprogram() {


    this.mypatientService.enrollProgram({ arrivelDate: this.arrivelDate, numberOfAdults: this.adult, numberOfChildren: this.children, programID: this.prog_id }).subscribe((resp: any) => {
      debugger
      console.log(resp)
    })

  }

  totalcost() {
    return this.children * this.childrenCost + this.adult * this.adultCost
  }


  open(content) {
    this.mypatientService.treatment_Approvment({ Did: this.tid, flag: 'true' }).subscribe((resp: any) => {
      debugger
      this.treatment_data = resp.data
      alert('Done')
    })
    this.modalService.open(content, { size: 'lg' });
  }



}
