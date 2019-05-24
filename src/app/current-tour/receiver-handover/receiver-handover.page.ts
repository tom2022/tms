import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {TourDataService} from "../../tour-data.service";
import {Tour} from "../../tour.model";

@Component({
  selector: 'app-receiver-handover',
  templateUrl: './receiver-handover.page.html',
  styleUrls: ['./receiver-handover.page.scss'],
})
export class ReceiverHandoverPage implements OnInit {
  parcelIDs: string;
  checkedParcels: string[] = [];
  submitButtonDisabled = false;
  loadedTour: Tour;
  tourNumber: number;

  constructor(
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private toursService: TourDataService) { }

  ngOnInit() {
      this.parcelIDs = this.route.snapshot.paramMap.get('parcelID');
      this.tourNumber = +this.route.snapshot.paramMap.get('tourNumber');
      this.checkedParcels = this.getParcels();
  }

  ionViewWillEnter() {
      this.toursService.tours.subscribe(tours => this.loadedTour = tours[this.tourNumber]);
  }

  onBack() {
      this.navCtrl.back();
  }

  getReceiverName() {
      return this.getReceiverInformation('name');
  }

  getReceiverStreet() {
      return this.getReceiverInformation('street');
  }

  getReceiverCity() {
      return this.getReceiverInformation('city');
  }

  getReceiverId() {
      return this.getReceiverInformation('id');
  }

  getReceiverInformation(info) {
      for(let parcel of this.loadedTour.parcelData){
          if(this.getParcels()[0] === parcel.sscc){
              for(let stop of this.loadedTour.tourStop){
                  if(parcel.receiverID === stop.id && stop.stopType === 'Receiver'){
                      switch(info){
                          case 'name': {
                              return stop.firstName + ' ' + stop.lastName
                          }
                          case 'street': {
                              return stop.streetName + ' ' + stop.streetNumber
                          }
                          case 'city': {
                              return stop.zip + ' ' + stop.city
                          }
                          case 'id': {
                              return stop.id
                          }
                      }
                  }
              }
          }
      }
  }

  getParcels(){
      return this.parcelIDs.split("%");
  }

  getParcelWithoutPrefix(parcel: string){
      return parcel.split("sscc:")[1];
  }

  updateParcel(e: any, parcel) {
      if(e.target.checked){
          this.checkedParcels.push(parcel);
          this.submitButtonDisabled = false;
      }
      else {
          this.checkedParcels = this.checkedParcels.filter(s => s !== parcel);
          if(this.checkedParcels.length == 0){
              this.submitButtonDisabled = true;
          }
      }
  }

  onConfirmParcelHandover() {
      if(this.checkedParcels.length === this.getParcels().length){
          this.toursService.updateCompletedStops(this.loadedTour.tourID, this.getReceiverId()).subscribe();
      }
      for(let checkedParcel of this.checkedParcels){
          this.toursService.updateDeliveredParcels(this.loadedTour.tourID, checkedParcel).subscribe();
          //if tour is mockup example tour, don't send ParcelDepotHandoverConfirmation to CAZ
          if(this.loadedTour.tourID !== '3249898432EXAMPLETOUR'){
              const today = new Date();
              const d = today.toISOString();
              this.toursService.sendParcelReceiverHandoverConfirmation(checkedParcel, d);
          }
      }

      this.onBack();
  }

}
