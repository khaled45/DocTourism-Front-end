import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'
import { DoctorService } from '../services/doctor.service';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  DataArr: any;
  filteredArray: any[];
  config: any;
  searchText: any = '';
  location: any = this.route.snapshot.queryParams.Location;
  area: any = this.route.snapshot.queryParams.area;
  cities: any;
  areas: any
  constructor(private myelementRef: ElementRef, private myCitiesService: CitiesService, public route: ActivatedRoute, private router: Router, private myDoctorService: DoctorService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 9,
      totalItems: 0
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1);

  }
  ngAfterViewInit(): void {
    // this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#195e83'
  }
  ngOnDestroy(): void {
    this.myelementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f3f7f3'

  }

  ngOnInit() {
    if (this.DataArr) { } else {
      this.getDoctors()
    }
    this.getCities()
  }


  getDoctors() {
    this.myDoctorService.getDoctors().subscribe((resp: any) => {
      this.DataArr = resp.data
      debugger
      if (this.location || this.area) {

        this.DataArr = this.DataArr.filter(doctor => {
          return doctor.location.location == this.location || doctor.location.area == this.area
        })
      } else if (this.location == 'all') {
        this.filteredArray = resp.data
      }
      this.filteredArray = [...this.DataArr]

    })
  }

  handleFilter(event) {
    const value = event.target.value
    this.filteredArray = this.DataArr.filter((val, ind) =>
      val.username.includes(value))
  }

  pageChange(newPage: number) {
    this.router.navigate(['home'], { queryParams: { page: newPage } });
  }




  getCities() {
    this.cities = this.myCitiesService.getGovernoratesWithSubregions()

  }
  getAreas(event) {
    if (event.target.value == 'all') {
      this.location = ''
      this.area = ''
    } else {
      this.location = event.target.value
      this.areas = this.myCitiesService.getSubregionsByname(this.location)
    }
  }


  genderFilter(type) {
    let genderArr = []
    this.filteredArray.filter((val) => {
      debugger
      if (val.gender == type) {
        genderArr.push(val)
      }

    })
    this.filteredArray = genderArr
    console.log(this.filteredArray)
  }

}
