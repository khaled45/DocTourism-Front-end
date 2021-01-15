import { Injectable } from '@angular/core';
import { Data } from './data';
const governamentes = new Data().MyData


@Injectable({
  providedIn: 'root'
})


export class CitiesService {

  constructor() { }

  getGovernoratesWithSubregions = function Governorates() {
    return governamentes.map(governorate => (governorate));
  }

  getGovernorates = function Governorates() {
    return governamentes.map(governorate => ({
      id: governorate.id, name_ar: governorate.name_ar, name_en: governorate.name_en
    }));
  }

  // getGovernorate = function Subregions(GovernorateID) {
  //   return governamentes.find(x => x.id === GovernorateID)
  // }

  getAllSubregions = function subregion() {
    return governamentes.map(area => ({
      subregions: area.subregions
    }))

  }

  getSubregionsByname = function Subregions(name_en) {
    return governamentes.find(x => x.name_en === name_en).subregions
  }

}
