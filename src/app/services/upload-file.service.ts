import { Injectable } from '@angular/core';
import { UploadModelModule } from '../upload-model/upload-model.module';

import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    imageURL: string

    constructor(private db: AngularFireDatabase, private MyHttpClient: HttpClient) { }

    pushUpload(upload: UploadModelModule) {
        let storageRef = firebase.storage().ref();
        let uploadTask = storageRef.child(`uploads/${upload.file.name}`).put(upload.file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
            (error) => {
                // Upload Failed
            }, () => {
                // Upload Success
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    upload.url = downloadURL;
                    this.imageURL = downloadURL.toString();
                    this.uploadImage().subscribe((resp: any) => {

                    })

                });

            });
    }

    uploadImage() {
        const { imageURL } = this
        return this.MyHttpClient.post('http://localhost:8085/doctor/uploadImage', { imageURL })
    }




}