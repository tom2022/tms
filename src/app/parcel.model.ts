export class Parcel {
    constructor(
        public receiverID: string,
        public sscc: string,
        public startTime: string,
        public plannedTimeframeStart: string,
        public depotID: string,
        public tourID: string,
        public isDelivered: boolean) {
    }
}