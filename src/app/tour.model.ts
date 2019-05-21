import {Parcel} from "./parcel.model";
import {TourStop} from "./tour-stop.model";

export class Tour {
    constructor(
        public tourID: string,
        public numberOfStops: number,
        public estimatedTime: number,
        public price: number,
        public tourStop: TourStop[],
        public parcelData: Parcel[],
        public tourStartTime?: string) {
    }
}