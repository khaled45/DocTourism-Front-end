import { Component, OnInit } from '@angular/core';
import { UploadModelModule } from '../upload-model/upload-model.module';
import { UploadService } from '../services/upload-file.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit {


    constructor(private myUploadService: UploadService) { }
  
    images: any
    currentUpload: UploadModelModule;
  
    ngOnInit() {
    }
  
    selectImage(event) {
  
      const file = event.target.files[0];
      this.images = file;
      this.currentUpload = new UploadModelModule(this.images);
      console.log('1', this.currentUpload)
  
      this.onSubmit()
    }
  
    onSubmit() {
      this.myUploadService.pushUpload(this.currentUpload)
  
    }
  
  
}
