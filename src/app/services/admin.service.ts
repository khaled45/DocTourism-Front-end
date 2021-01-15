import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AdminServices {

    backendURL = 'http://localhost:8085/admin/'
    constructor(private myHttpClient: HttpClient) { }

    listDoctors() {
        return this.myHttpClient.get(this.backendURL + 'listDcotorsAndAgents')
    }

    approveDoc(data) {
        return this.myHttpClient.post(this.backendURL + 'Approving', data)
    }
}