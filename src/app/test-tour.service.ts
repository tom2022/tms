import {Tour} from "./tour.model";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class TestTourService {

    private _etour: Tour  = {
        tourID : '3249898432EXAMPLETOUR',
        numberOfStops: 7,
        tourStartTime : '2019-06-11T13:50Z[UTC]',
        estimatedTime: 26,
        price: 1153,
        tourStop: [
            {
                stopType: 'Depot',
                id: '900',
                lastName: 'Mueller',
                firstName: 'Pickshop',
                streetName: 'Zeppelinstrasse',
                streetNumber: '146',
                zip: '14471',
                city: 'Potsdam',
                stopCompleted: false,
                plannedTimeframeStart: '2019-06-11T13:50Z[UTC]',
                country: 'DE',
                organization: 'Kiosk am Bahnhof',
                depotCategory: 'Kiosk'
            },
            {
                stopType: 'Receiver',
                id: '123',
                lastName: 'Wolf',
                firstName: 'Anne',
                streetName: 'Meistersingerstrasse',
                streetNumber: '18',
                zip: '14471',
                city: 'Potsdam',
                startTime: '2019-06-11T13:45Z[UTC]',
                endTime: '2019-06-11T15:45Z[UTC]',
                plannedTimeframeStart: '2019-06-11T14:00Z[UTC]',
                stopCompleted: false,
                country: 'DE',
                receiverLevel: 2,
                receiverRemark: 'Bitte 2x klingeln'
            },
            {
                stopType: 'Receiver',
                id: '234',
                lastName: 'Brinkmann',
                firstName: 'Robert',
                streetName: 'Meistersingerstrasse',
                streetNumber: '11',
                zip: '14471',
                city: 'Potsdam',
                startTime: '2019-06-11T13:45Z[UTC]',
                endTime: '2019-06-11T15:45Z[UTC]',
                plannedTimeframeStart: '2019-06-11T14:05Z[UTC]',
                stopCompleted: false,
                country: 'DE',
                receiverLevel: 1,
                receiverRemark: 'Hinterhaus'
            },
            {
                stopType: 'Receiver',
                id: '345',
                lastName: 'Hummel',
                firstName: 'Stephanie',
                streetName: 'Hans-Sachs-Strasse',
                streetNumber: '55',
                zip: '14471',
                city: 'Potsdam',
                startTime: '2019-06-11T14:00Z[UTC]',
                endTime: '2019-06-11T16:00Z[UTC]',
                plannedTimeframeStart: '2019-06-11T14:10Z[UTC]',
                stopCompleted: false,
                country: 'DE',
                receiverLevel: 3,
                receiverRemark: ''
            },
            {
                stopType: 'Depot',
                id: '901',
                lastName: 'Schmidt',
                firstName: 'Frank',
                streetName: 'Hans-Sachs-Strasse',
                streetNumber: '39',
                zip: '14471',
                city: 'Potsdam',
                stopCompleted: false,
                country: 'DE',
                organization: 'Bäckerei Schmidt',
                depotCategory: 'Kiosk'
            },
            {
                stopType: 'Receiver',
                id: '456',
                lastName: 'Berg',
                firstName: 'Clara',
                streetName: 'Geschwister-Scholl-Strasse',
                streetNumber: '68',
                zip: '14471',
                city: 'Potsdam',
                startTime: '2019-06-11T14:00Z[UTC]',
                endTime: '2019-06-11T16:00Z[UTC]',
                plannedTimeframeStart: '2019-06-11T14:13Z[UTC]',
                stopCompleted: false,
                country: 'DE',
                receiverLevel: 0,
                receiverRemark: ''
            },
            {
                stopType: 'Receiver',
                id: '567',
                lastName: 'Schneider',
                firstName: 'Mirko',
                streetName: 'Kastanienallee',
                streetNumber: '35',
                zip: '14471',
                city: 'Potsdam',
                startTime: '2019-06-11T14:00Z[UTC]',
                endTime: '2019-06-11T16:00Z[UTC]',
                plannedTimeframeStart: '2019-06-11T14:16Z[UTC]',
                stopCompleted: false,
                country: 'DE',
                receiverLevel: 0,
                receiverRemark: ''
            }
        ],
        parcelData: [
            {
                receiverID: '123',
                sscc: 'urn:epc:id:sscc:4387847.0000000333',
                depotID: '900',
                isDelivered: false
            },
            {
                receiverID: '234',
                sscc: 'urn:epc:id:sscc:4387847.0000000444',
                depotID: '900',
                isDelivered: false
            },
            {
                receiverID: '234',
                sscc: 'urn:epc:id:sscc:4333347.0000000555',
                depotID: '900',
                isDelivered: false
            },
            {
                receiverID: '345',
                sscc: 'urn:epc:id:sscc:1003347.0000000666',
                depotID: '900',
                isDelivered: false
            },
            {
                receiverID: '456',
                sscc: 'urn:epc:id:sscc:3101347.0000000777',
                depotID: '900',
                isDelivered: false
            },
            {
                receiverID: '567',
                sscc: 'urn:epc:id:sscc:4421347.0000000888',
                depotID: '901',
                isDelivered: false
            },
            {
                receiverID: '567',
                sscc: 'urn:epc:id:sscc:7421343.0000000999',
                depotID: '901',
                isDelivered: false
            }
        ]
    };

    constructor() {
    }

    get exampleTour() {
        return this._etour;
    }


}
