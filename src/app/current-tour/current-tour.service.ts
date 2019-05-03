import { Injectable } from '@angular/core';
import {Tour} from "../tour.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentTourService {

  private _ctour: Tour  = {
      tourID : '3249898432',
      tourStartTime : new Date('2019-07-11T09:00:00'),
      numberOfStops: 7,
      estimatedTime: 50,
      price: 11.53,
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
              country: 'DE',
              stopCompleted: false,
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
              country: 'DE',
              stopCompleted: false,
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
              country: 'DE',
              stopCompleted: false,
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
              country: 'DE',
              stopCompleted: false,
              receiverLevel: 3,
              receiverRemark: ''
          },
          {
              stopType: 'Depot',
              id: '901',
              lastName: 'Schachmann',
              firstName: 'Kiosk',
              streetName: 'Hans-Sachs-Strasse',
              streetNumber: '39',
              zip: '14471',
              city: 'Potsdam',
              country: 'DE',
              stopCompleted: false,
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
              country: 'DE',
              stopCompleted: false,
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
              country: 'DE',
              stopCompleted: false,
              receiverLevel: 0,
              receiverRemark: ''
          }
      ],
      parcelData: [
          {
              receiverID: '123',
              sscc: '43878478347',
              startTime: new Date('2019-07-11T09:00:00'),
              plannedTimeframeStart: new Date('2019-07-11T09:10:00'),
              depotID: '900',
              isDelivered: false
          },
          {
              receiverID: '234',
              sscc: '43878478234',
              startTime: new Date('2019-07-11T09:00:00'),
              plannedTimeframeStart: new Date('2019-07-11T09:20:00'),
              depotID: '900',
              isDelivered: false
          },
          {
              receiverID: '234',
              sscc: '43333478234',
              startTime: new Date('2019-07-11T09:00:00'),
              plannedTimeframeStart: new Date('2019-07-11T09:20:00'),
              depotID: '900',
              isDelivered: false
          },
          {
              receiverID: '345',
              sscc: '10033478235',
              startTime: new Date('2019-07-11T09:00:00'),
              plannedTimeframeStart: new Date('2019-07-11T09:30:00'),
              depotID: '900',
              isDelivered: false
          },
          {
              receiverID: '456',
              sscc: '31013478235',
              startTime: new Date('2019-07-11T09:00:00'),
              plannedTimeframeStart: new Date('2019-07-11T09:35:00'),
              depotID: '900',
              isDelivered: false
          },
          {
              receiverID: '567',
              sscc: '44213478162',
              startTime: new Date('2019-07-11T09:00:00'),
              plannedTimeframeStart: new Date('2019-07-11T09:45:00'),
              depotID: '901',
              isDelivered: false
          },
          {
              receiverID: '567',
              sscc: '74213438163',
              startTime: new Date('2019-07-11T09:00:00'),
              plannedTimeframeStart: new Date('2019-07-11T09:45:00'),
              depotID: '901',
              isDelivered: false
          }
      ]
  };

  get currentTour() {
    return this._ctour;
  }

  constructor() { }
}
