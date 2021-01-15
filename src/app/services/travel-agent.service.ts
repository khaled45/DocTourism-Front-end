import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class travelAgentService {

    constructor(private myHttpClient: HttpClient) { }

    backendURL = 'http://localhost:8085/travelAgent/'

    signUp(data) {
        return this.myHttpClient.post(this.backendURL + 'signUp', data);
    }

    getAccount() {
        return this.myHttpClient.get(this.backendURL + 'account')
    }

    addProgram(data) {
        return this.myHttpClient.post(this.backendURL + 'AddProgram', data)
    }
    deleteProgram(programID) {
        return this.myHttpClient.post(this.backendURL + 'deleteProgram', programID)
    }
    AddProgram(data) {
        return this.myHttpClient.post(this.backendURL + 'AddProgram', data)
    }

    getAllprograms() {
        return this.myHttpClient.get(this.backendURL + 'AllPrograms');
    }

    getprogram(programID) {
        return this.myHttpClient.post(this.backendURL + 'getprogram', programID);
    }
}