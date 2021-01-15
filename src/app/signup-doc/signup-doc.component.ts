import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CitiesService } from '../services/cities.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup-doc',
  templateUrl: './signup-doc.component.html',
  styleUrls: ['./signup-doc.component.scss']
})
export class SignupDocComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  hide = true;
  errorData = false
  username: any
  email: any
  password: any
  phone: any
  briefSummery: any
  location: any
  area: any
  gender: any
  title: any

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  dynamicForm: FormGroup;
  submitted = false;
  doc_questions
  cities: any;
  areas: any;

  constructor(private modalService: NgbModal, private myCitiesService: CitiesService, public myAuthService: AuthService, private myRouter: Router, public formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.firstFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required],
      locationCtrl: ['', Validators.required],
      areaCtrl: ['', Validators.required],
      genderCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required]

    });
    this.secondFormGroup = this.formBuilder.group({
      briefSummeryCtrl: ['', Validators.required],
      titleCtrl: ['', Validators.required]

    });

    window.scroll(0, 0);

    this.dynamicForm = this.formBuilder.group({
      numberOfQuestions: ['', Validators.required],
      Questions: new FormArray([])
    });
    this.getCities();

  }


  Register(content) {
    const { username, email, password, phone, briefSummery, gender, title } = this
    const Questions = this.doc_questions

    this.myAuthService.d_register({ username, email, password, phone, gender, title, briefSummery, Questions, location: { location: this.location, area: this.area } }).subscribe((resp: any) => {
      if (resp.message == "success") {
        this.errorData = false
        this.openLg(content)
        setTimeout(() => {
          this.modalService.dismissAll()
        }, 3000);
        this.myRouter.navigate(['/']  )
      }
      else {
        this.errorData = true
      }
    })
  }


  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get q() { return this.f.Questions as FormArray; }

  onChangeQuestions(e) {
    console.log(e)
    const numberOfQuestions = e.target.value || 0;
    if (this.q.length < numberOfQuestions) {
      for (let i = this.q.length; i < numberOfQuestions; i++) {
        this.q.push(this.formBuilder.group({
          question: ['', Validators.required],
          type: ['', Validators.required]
        }));
      }
    } else {
      for (let i = this.q.length; i >= numberOfQuestions; i--) {
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

    this.doc_questions = this.dynamicForm.value.Questions
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

  getCities() {
    this.cities = this.myCitiesService.getGovernoratesWithSubregions()

  }
  getAreas(city_name) {
    this.areas = this.myCitiesService.getSubregionsByname(city_name)
  }


  openLg(content) {
    this.modalService.open(content);
  }


}
