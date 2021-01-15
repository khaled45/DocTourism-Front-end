import { Component, OnInit } from '@angular/core';
import { travelAgentService } from '../services/travel-agent.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CitiesService } from '../services/cities.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export interface Included {
  name: string;
}

export interface Excluded {
  name: string;
}

@Component({
  selector: 'app-travel-dashboard',
  templateUrl: './travel-dashboard.component.html',
  styleUrls: ['./travel-dashboard.component.scss']
})
export class TravelDashboardComponent implements OnInit {
  programID: any
  hideNextBtn = false
  showError = false
  Tdata: any
  dynamicForm: FormGroup;
  submitted = false;
  Itinerary
  cities: any;

  allPrograms: any;
  allVisitors: any;



  constructor(private mytravelAgentService: travelAgentService, public formBuilder: FormBuilder, private myCitiesService: CitiesService, private modalService: NgbModal) { }
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ngOnInit(): void {

    this.firstFormGroup = this.formBuilder.group({
      titleCtrl: ['', Validators.required],
      categoryCtrl: ['', Validators.required],
      adultCtrl: ['', Validators.required],
      childrenCtrl: ['', Validators.required],
      daysCtrl: ['', Validators.required],
      locationCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      includeCtrl: [[], Validators.required],
      excludeCtrl: [[], Validators.required]
    });


    this.dynamicForm = this.formBuilder.group({
      itineraryNumber: ['', Validators.required],
      itineraryList: new FormArray([])
    });

    this.getCities();
    this.getAccount();
  }

  getAccount() {
    this.mytravelAgentService.getAccount().subscribe((resp: any) => {
      this.Tdata = resp.data
      debugger
      this.allPrograms = this.Tdata.tourismPrograms
      this.allVisitors = this.Tdata.patientsID
      debugger
      console.log(this.Tdata, '=====', this.allPrograms)
    })
  }






  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get q() { return this.f.itineraryList as FormArray; }

  onChangeQuestions(e) {
    console.log(e)
    const itineraryNumber = e.target.value || 0;
    if (this.q.length < itineraryNumber) {
      for (let i = this.q.length; i < itineraryNumber; i++) {
        this.q.push(this.formBuilder.group({
          description: ['', Validators.required],
          title: ['', Validators.required]
        }));
      }
    } else {
      for (let i = this.q.length; i >= itineraryNumber; i--) {
        this.q.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    this.Itinerary = this.dynamicForm.value.itineraryList
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.q.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.q.reset();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //// Included


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  includes: Included[] = [
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.includes.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(include: Included): void {
    const index = this.includes.indexOf(include);

    if (index >= 0) {
      this.includes.splice(index, 1);
    }
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //// Excluded


  EXvisible = true;
  Exselectable = true;
  Exremovable = true;
  EXaddOnBlur = true;
  readonly ExseparatorKeysCodes: number[] = [ENTER, COMMA];
  excludes: Excluded[] = [
  ];

  Exadd(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.excludes.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  Exremove(exclude: Excluded): void {
    const index = this.excludes.indexOf(exclude);

    if (index >= 0) {
      this.excludes.splice(index, 1);
    }
  }

  getCities() {
    this.cities = this.myCitiesService.getGovernoratesWithSubregions()

  }


  AddProgram() {
    this.mytravelAgentService.addProgram({
      title: this.firstFormGroup.value.titleCtrl,
      catygory: this.firstFormGroup.value.categoryCtrl,
      numberOfDays: this.firstFormGroup.value.daysCtrl,
      location: this.firstFormGroup.value.locationCtrl,
      itinerary: this.Itinerary,
      included: this.includes,
      excluded: this.excludes,
      cost: { adultCost: this.firstFormGroup.value.adultCtrl, childrenCost: this.firstFormGroup.value.childrenCtrl },

    }).subscribe((resp: any) => {
      if (resp.message == "success") {
        this.showError = false
        this.programID = resp.data._id
        this.hideNextBtn = true
      }
      else {
        this.hideNextBtn = false
        this.showError = true
      }
    })
  }

  DeleteProgram(id) {
    this.mytravelAgentService.deleteProgram({ programID: id }).subscribe((resp: any)=>{
      console.log(resp)
    })
  }

  // Start Modal Configration 
  closeResult = '';

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', scrollable: true, backdrop: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  // End Modal Configration 



}
