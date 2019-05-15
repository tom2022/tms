export class Parcel {
    constructor(
        public receiverID: string,
        public sscc: string,
        public startTime: object,
        public plannedTimeframeStart: object,
        public depotID: string,
        public tourID: string,
        public isDelivered: boolean) {
    }
}