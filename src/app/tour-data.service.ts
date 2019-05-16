import {HttpClient} from "@angular/common/http";
import {map, take, tap} from "rxjs/operators";
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
    //private _tours: BehaviorSubject<Tour[]> = new BehaviorSubject<Tour[]>([]);
    /*send tour id To Sphinx
    return this.http.post('someURL', tourID)
    .pipe(tap( resDate => {
        console.log(resData);
    }));*/

    get tours() {
        return this._tours.asObservable();
    }

    sendParcelDepotHandoverConfirmation(parcelID, date) {
        return this.http.post('Xhttps://bpt-lab.org/smile/caz/tms/pick-up-reported', {
            sscc: parcelID,
            pickDate: date
        }).subscribe( (response) => {
            console.log(response);
        })
    }

    sendParcelReceiverHandoverConfirmation(parcelID, date) {
        console.log(parcelID, date);
        return this.http.post('Xhttps://bpt-lab.org/smile/caz/tms/delivery-reported', {
            sscc: parcelID,
            receiveDate: date
        }).subscribe((response) => {
            console.log(response);
        });
    }

    fetchTours() {
        return this.http
            .get('https://bpt-lab.org/smile/sphinx/getTours')
            .pipe(
                map(resData => {
                    let newTours = [];
                    newTours.push(this.exampleTourService.exampleTour);
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
                                false,
                                stop.country,
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
                                parcel.tourID,
                                false
                            ))
                        }
                        newTours.push(new Tour(
                            metaData.tourID,
                            metaData.numberOfStops,
                            metaData.estimatedTime,
                            metaData.price,
                            newStops,
                            newParcels,
                            metaData.tourStartTime
                        ))
                    }
                    return newTours;
                }),
                tap(tours => {
                    this._tours.next(tours);
                })
            );
    }

    updateDeliveredParcels(tourID, deliveredParcel){
        return this.tours.pipe(take(1), tap(tours => {
            const tourIndex = tours.findIndex(t => t.tourID === tourID);
            const updatedTours = [...tours];
            const oldTour = updatedTours[tourIndex];
            let updatedParcels = [];
            for(let p of oldTour.parcelData){
                if(p.sscc === deliveredParcel){
                    updatedParcels.push(new Parcel(p.receiverID, p.sscc, p.startTime, p.plannedTimeframeStart, p.depotID, p.tourID, true));
                }
                else{
                    updatedParcels.push(p);
                }
            }
            updatedTours[tourIndex] = new Tour(
                oldTour.tourID,
                oldTour.numberOfStops,
                oldTour.estimatedTime,
                oldTour.price,
                oldTour.tourStop,
                updatedParcels
        );
            this._tours.next(updatedTours);
        }));
    }

    updateCompletedStops(tourID, stopID){
        return this.tours.pipe(take(1), tap( tours => {
            const tourIndex = tours.findIndex(t => t.tourID === tourID);
            const updatedTours = [...tours];
            const oldTour = updatedTours[tourIndex];
            let updatedStops = [];
            for(let s of oldTour.tourStop){
                if(s.id === stopID){
                    updatedStops.push(new TourStop(s.stopType, s.id, s.lastName, s.firstName, s.streetName, s.streetNumber, s.zip, s.city, true, s.country, s.organization, s.receiverLevel, s.receiverRemark, s.depotCategory));
                }
                else{
                    updatedStops.push(s);
                }
            }
            updatedTours[tourIndex] = new Tour(
                oldTour.tourID,
                oldTour.numberOfStops,
                oldTour.estimatedTime,
                oldTour.price,
                updatedStops,
                oldTour.parcelData
            );
            this._tours.next(updatedTours);
            }
        ))
    }
}