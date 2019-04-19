import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Parcel} from "./parcel.model";

@Injectable({
    providedIn: 'root'
})

export class TourDataService {

    constructor(private http: HttpClient) {

    }

    /*send tour id To Sphinx
    return this.http.post('someURL', tourID)
    .pipe(tap( resDate => {
        console.log(resData);
    }));*/

    fetchTours() {
        return this.http.get('https://bpt-lab.org/smile/sphinx/getTours')
            .pipe(
                map(resData => {
                    let parcels = [];
                    //let parcels = new BehaviorSubject<Parcel[]>();
                    for(let parcel of resData["packets"]){
                        const receiver = parcel["receiver"];
                        const depot = parcel["depot"];
                        const tour = parcel["tour"];
                        parcels.push(new Parcel(
                            receiver["receiverZIP"],
                            receiver["receiverCity"],
                            receiver["receiverStreetName"],
                            receiver["receiverStreetNumber"],
                            depot["depotStreetName"],
                            depot["depotStreetNumber"],
                            depot["depotCity"],
                            depot["id"],
                            tour["id"],
                            parcel["sscc"],
                            parcel["id"]
                        ))
                    }
                    return parcels;
                })
            );
    }
}