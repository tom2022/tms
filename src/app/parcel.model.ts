export class Parcel {
    constructor(
        public receiverZIP: string,
        public receiverCity: string,
        public receiverStreetName: string,
        public receiverStreetNumber: string,
        public depotStreetName: string,
        public depotStreetNumber: string,
        public depotCity: string,
        public depotID: string,
        public tourID: string,
        public sscc: string,
        public parcelID: string) {
    }
}