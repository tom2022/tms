export class TourStop {
    constructor(
        public stopType: string,
        public id: string,
        public lastName: string,
        public firstName: string,
        public streetName: string,
        public streetNumber: string,
        public zip: string,
        public city: string,
        public country: string,
        public stopCompleted: boolean,
        public organization?: string,
        public receiverLevel?: number,
        public receiverRemark?: string,
        public depotCategory?: string) {
    }
}