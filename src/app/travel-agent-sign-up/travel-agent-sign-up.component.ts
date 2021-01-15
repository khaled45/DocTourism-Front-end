import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';
import { Router, ActivatedRoute } from '@angular/router';
import { travelAgentService } from '../services/travel-agent.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-travel-agent-sign-up',
  templateUrl: './travel-agent-sign-up.component.html',
  styleUrls: ['./travel-agent-sign-up.component.scss']
})
export class TravelAgentSignUpComponent implements OnInit {

  location: any;
  area: any;
  cities: any;
  areas: any;
  companyName: any
  password: any
  email: any
  phone: any

  Error = false
  invalidMail = false
  constructor(private modalService: NgbModal,private myCitiesService: CitiesService, private router: Router, public route: ActivatedRoute, private mytravelAgentService: travelAgentService) { }

  ngOnInit(): void {
    this.getCities()
  }

  hide = true;

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


  register(content) {
    if (this.companyName && this.location && this.email && this.area && this.password && this.phone) {
      this.Error = false
      this.mytravelAgentService.signUp({
        companyName: this.companyName,
        password: this.password,
        email: this.email,
        phone: this.phone,
        location: { location: this.location, area: this.area }
      }).subscribe((resp: any) => {
        if(resp.message == "user already registered"){
          this.Error = false
          this.invalidMail = true
        }
        else if(resp.message == "success"){
          this.openLg(content)
           setTimeout(() => {
            this.modalService.dismissAll()
          }, 3000);
          this.router.navigate(['/']  )
        }
        else{
          this.invalidMail = false

          this.Error = true
        }
      })
    }
    else {
      this.invalidMail = false

      this.Error = true
    }
  }


  

  openLg(content) {
    this.modalService.open(content);
  }

}
