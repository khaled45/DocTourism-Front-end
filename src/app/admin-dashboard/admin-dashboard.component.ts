import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminServices } from '../services/admin.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {



  Doctors: any
  travelAgents: any

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [ 59, 80, 81, 56, 55, 40], label: ' Doctors' },
    { data: [ 48, 40, 19, 86, 27, 100], label: ' Patients' }
  ];
  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  Done: boolean;
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  constructor(public myAdminServices: AdminServices, private _snackBar: MatSnackBar,public myAuthService: AuthService) { }

  ngOnInit(): void {
    if (this.Doctors) { } else { this.listDoctorsandAgents() }
  }

  listDoctorsandAgents() {
    this.myAdminServices.listDoctors().subscribe((resp: any) => {
      debugger
      if (resp.message == 'success') {
        console.log(resp)
        this.Doctors = resp.data.doctors
        this.travelAgents = resp.data.travelAgents
      }
      else {
        alert('response error')
      }
    })
  };

  approveDoc(Did, flag) {

    this.myAdminServices.approveDoc({ ID: Did, approveFlag: flag }).subscribe((resp: any) => {
      if (resp.message == 'success') {
        if (flag == 'true') {
          this.openSnackBar('Approvement', 'Done')
          this.listDoctorsandAgents()
        } else {
          this.openSnackBar('DisApprovement', 'Done')
          this.listDoctorsandAgents()
        }
      }
    });
  }

  approveTravel(Tid, flag) {
    this.myAdminServices.approveDoc({ ID: Tid, approveFlag: flag }).subscribe((resp: any) => {
      if (resp.message == 'success') {
        if (flag == 'true') {
          this.openSnackBar('Approvement', 'Done')
          this.listDoctorsandAgents()
        } else {
          this.openSnackBar('DisApprovement', 'Done')
          this.listDoctorsandAgents()
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
