import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Parcel} from "./parcel.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class TourDataService {

    private _parcels: BehaviorSubject<Parcel[]> = new BehaviorSubject<Parcel[]>([]);

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
                    let newParcels = [];
                    for(let parcel of resData["packets"]){
                        const receiver = parcel["receiver"];
                        const depot = parcel["depot"];
                        const tour = parcel["tour"];
                        newParcels.push(new Parcel(
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
                    return newParcels;
                }),
                tap(parcels => {
                    this._parcels.next(parcels);
                })
            );
    }
}