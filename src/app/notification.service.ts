import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class NotificationService {

    constructor(private http: HttpClient) {
    }

    sendParcelDepotHandoverConfirmation(parcelID, date) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post('https://bpt-lab.org/smile/caz/tms/pick-up-reported', {
            sscc: parcelID,
            pickDate: date
        }, { headers: headers }).subscribe( (response) => {
            console.log(response);
        });
    }

    sendParcelReceiverHandoverConfirmation(parcelID, date) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post('https://bpt-lab.org/smile/caz/tms/delivery-reported', {
            sscc: parcelID,
            receiveDate: date
        }, { headers: headers }).subscribe( (response) => {
            console.log(response);
        });
    }

}
