import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, take, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Parcel} from "./parcel.model";
import {BehaviorSubject} from "rxjs";
import {Tour} from "./tour.model";
import {TourStop} from "./tour-stop.model";
import {TestTourService} from "./test-tour.service";

@Injectable({
    providedIn: 'root'
})

export class TourDataService {

    constructor(private http: HttpClient, private testTourService: TestTourService) {
    }

    private _tours: BehaviorSubject<Tour[]> = new BehaviorSubject<Tour[]>([this.testTourService.exampleTour]);

    get tours() {
        return this._tours.asObservable();
    }

    /*const tours_sort = function (tour1, tour2) {
        const t1 = tour1.tourStartTime.split('T');
        const t2 = tour2.tourStartTime.split('T');
        const date1 = t1[0].tourStartTime.split('-');
        const date2 = t2[0].tourStartTime.split('-');
        const time1 = t1[1].tourStartTime.split(':');
        const time2 = t2[1].tourStartTime.split(':');
        // compare years of tours
        if (+date1[0] > +date2[0]) {
            return -1;
        }
        if (+date1[0] < +date2[0]) {
            return 1;
        }
        // compare months of tours
        if (+date1[1] > +date2[1]) {
            return -1;
        }
        if (+date1[1] < +date2[1]) {
            return 1;
        }
        // compare days of tours
        if (+date1[2] > +date2[2]) {
            return -1;
        }
        if (+date1[2] < +date2[2]) {
            return 1;
        }
        // compare hours of tours
        if (+time1[0] > +time2[0]) {
            return -1;
        }
        if (+time1[0] < +time2[0]) {
            return 1;
        }
        // compare minutes of tours
        if (+time1[1] > +time2[1]) {
            return -1;
        }
        if (+time1[1] < +time2[1]) {
            return 1;
        }
        else {
            return 0;
        }
    }*/

    fetchTours() {
        return this.http
            .get('https://bpt-lab.org/smile/sphinx/getTours')
            .pipe(
                map(resData => {
                    let newTours = [];
                    newTours.push(this.testTourService.exampleTour);
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
                                stop.startTime,
                                stop.endTime,
                                stop.plannedTimeframeStart,
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
                                parcel.depotID,
                                false
                            ))
                        }
                        newTours.push(new Tour(
                            metaData.tourID,
                            metaData.numberOfStops,
                            metaData.tourStartTime,
                            metaData.estimatedTime,
                            metaData.price,
                            newStops,
                            newParcels,
                        ))
                    }
                    newTours.sort(function (tour1, tour2) {
                        const t1 = tour1.tourStartTime.split('T');
                        const t2 = tour2.tourStartTime.split('T');
                        const date1 = t1[0].split('-');
                        const date2 = t2[0].split('-');
                        const time1 = t1[1].split(':');
                        const time2 = t2[1].split(':');
                        // compare years of tours
                        if (+date1[0] < +date2[0]) {
                            return -1;
                        }
                        if (+date1[0] > +date2[0]) {
                            return 1;
                        }
                        // compare months of tours
                        if (+date1[1] < +date2[1]) {
                            return -1;
                        }
                        if (+date1[1] > +date2[1]) {
                            return 1;
                        }
                        // compare days of tours
                        if (+date1[2] < +date2[2]) {
                            return -1;
                        }
                        if (+date1[2] > +date2[2]) {
                            return 1;
                        }
                        // compare hours of tours
                        if (+time1[0] < +time2[0]) {
                            return -1;
                        }
                        if (+time1[0] > +time2[0]) {
                            return 1;
                        }
                        // compare minutes of tours
                        if (+time1[1] < +time2[1]) {
                            return -1;
                        }
                        if (+time1[1] > +time2[1]) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
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
                    updatedParcels.push(new Parcel(p.receiverID, p.sscc, p.depotID,true));
                }
                else{
                    updatedParcels.push(p);
                }
            }
            updatedTours[tourIndex] = new Tour(
                oldTour.tourID,
                oldTour.numberOfStops,
                oldTour.tourStartTime,
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
                    updatedStops.push(new TourStop(s.stopType, s.id, s.lastName, s.firstName, s.streetName, s.streetNumber, s.zip, s.city, true, s.startTime, s.endTime, s.plannedTimeframeStart, s.country, s.organization, s.receiverLevel, s.receiverRemark, s.depotCategory));
                }
                else{
                    updatedStops.push(s);
                }
            }
            updatedTours[tourIndex] = new Tour(
                oldTour.tourID,
                oldTour.numberOfStops,
                oldTour.tourStartTime,
                oldTour.estimatedTime,
                oldTour.price,
                updatedStops,
                oldTour.parcelData
            );
            this._tours.next(updatedTours);
            }
        ))
    }

    sendParcelDepotHandoverConfirmation(parcelID, date) {
        let headers = new HttpHeaders();
        headers.append('Content-Type','application/json');
        return this.http.post('https://bpt-lab.org/smile/caz/tms/pick-up-reported', {
            sscc: parcelID,
            pickDate: date
        }, { headers: headers }).subscribe( (response) => {
            console.log(response);
        })
    }

    sendParcelReceiverHandoverConfirmation(parcelID, date) {
        let headers = new HttpHeaders();
        headers.append('Content-Type','application/json');
        return this.http.post('https://bpt-lab.org/smile/caz/tms/delivery-reported', {
            sscc: parcelID,
            receiveDate: date
        }, { headers: headers }).subscribe( (response) => {
            console.log(response);
        })
    }
}