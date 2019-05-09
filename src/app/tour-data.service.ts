import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Parcel} from "./parcel.model";
import {BehaviorSubject} from "rxjs";
import {Tour} from "./tour.model";
import {TourStop} from "./tour-stop.model";
import {ExampleDataService} from "./example-data.service";

@Injectable({
    providedIn: 'root'
})

export class TourDataService {

    constructor(private http: HttpClient, private exampleTourService: ExampleDataService) {

    }

    private _tours: BehaviorSubject<Tour[]> = new BehaviorSubject<Tour[]>([this.exampleTourService.exampleTour]);

    /*send tour id To Sphinx
    return this.http.post('someURL', tourID)
    .pipe(tap( resDate => {
        console.log(resData);
    }));*/

    get tours() {
        return this._tours.asObservable();
    }

    fetchTours() {
        return this.http
            .get('https://bpt-lab.org/smile/sphinx/getTours')
            .pipe(
                map(resData => {
                    let newTours = [];
                    for(let tour of resData["tours"]){
                        const stops = tour["stops"];
                        const parcels = tour["packets"];
                        const metaData = tour["tourMetaData"];
                        let newStops = [];
                        let newParcels = [];
                        for(let stop of stops){
                            newStops.push(new TourStop(
                                stop.stopType,
                                stop.id,
                                stop.lastName,
                                stop.firstName,
                                stop.streetName,
                                stop.streetNumber,
                                stop.zip,
                                stop.city,
                                stop.country,
                                false,
                                stop.organization,
                                stop.receiverLevel,
                                stop.receiverRemark,
                                stop.depotCategory
                            ))
                        }
                        for(let parcel of parcels) {
                            newParcels.push(new Parcel(
                                parcel.receiverID,
                                parcel.sscc,
                                parcel.startTime,
                                parcel.plannedTimeframeStart,
                                parcel.depotID,
                                false
                            ))
                        }
                        newTours.push(new Tour(
                            metaData.tourID,
                            metaData.tourStartTime,
                            metaData.numberOfStops,
                            metaData.estimatedTime,
                            metaData.price,
                            newStops,
                            newParcels
                        ))
                    }
                    return newTours;
                }),
                tap(tours => {
                    this._tours.next(tours);
                })
            );
    }
}