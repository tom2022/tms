export class Parcel {
    constructor(
        public receiverID: string,
        public sscc: string,
        public depotID: string,
        public isDelivered: boolean) {
    }
}