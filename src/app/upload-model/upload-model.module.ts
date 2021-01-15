import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UploadModelModule {

  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  user: String;
  cretedAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }

 }
