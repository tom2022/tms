import { Injectable } from '@angular/core';
import {CurrentTour} from "./current-tour.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentTourService {
  private _ctour: CurrentTour  = {
      id : 'p1',
      title : ' First Tour',
      addresses : [
          ['Pickshop - Der Jonas', 'Stahnsdorfer Str. 144a', '14482 Potsdam', '1234567', 'true'],
          ['Kerstin', 'Hauptstr. 2', '14467 Potsdam', '1234567', 'false'],
          ['Carla', 'Hauptstr. 3', '14467 Potsdam', '1234567', 'false'],
          ['Marius', 'Hauptstr. 4', '14467 Potsdam', '1234567', 'false'],
          ['Max', 'Hauptstr. 5', '14467 Potsdam', '1234567', 'false'],
          ['Anjo', 'Hauptstr. 6', '14467 Potsdam', '1234567', 'true']
      ]
  };

  get currentTour() {
    return this._ctour;
  }

  constructor() { }
}
