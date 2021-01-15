import { Component, OnInit } from '@angular/core';
import { patientService } from '../services/patient.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  treatmentPlans: any
  diagnosis_form: any;
  program_data: any;

  constructor(public mypatientService: patientService, private _snackBar: MatSnackBar, private myRouter: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.get_patient()
  }

  get_patient() {
    this.mypatientService.get_patient().subscribe((resp: any) => {
      debugger
      this.treatmentPlans = resp.data
      this.diagnosis_form = resp.patient.diagnosisForm
      this.program_data = resp.patient.program
    })
  }

  approveTreat(Did, flag, location) {

    if (flag == 'true') {
      setTimeout(() => {
        this.myRouter.navigate(['/programstour', { location, Did }])
      }, 2000)
    } else {
      this.mypatientService.treatment_Approvment({ treatmentID: Did, accept_flag: flag }).subscribe((resp: any) => {
        this.openSnackBar('DisApprovement', 'Done')
        this.get_patient()

      })
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


  open(content) {
    this.modalService.open(content);
  }

}
