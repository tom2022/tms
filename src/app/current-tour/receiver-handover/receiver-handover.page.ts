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

  constructor(
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private toursService: TourDataService) { }

  ngOnInit() {
      this.parcelIDs = this.route.snapshot.paramMap.get('parcelID');
      this.checkedParcels = this.getParcels();
      console.log(this.checkedParcels);
  }

  ionViewWillEnter() {
        this.toursService.tours.subscribe(tours => this.loadedTour = tours[0]);
        console.log(this.loadedTour);
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
                      if(info === 'name'){
                          return stop.firstName + ' ' + stop.lastName
                      }
                      if(info === 'street'){
                          return stop.streetName + ' ' + stop.streetNumber
                      }
                      if(info === 'city'){
                          return stop.zip + ' ' + stop.city
                      }
                      if(info === 'id'){
                          return stop.id
                      }
                  }
              }
          }
      }
  }

  onBack() {
      this.navCtrl.back();
  }

  getParcels(){
      return this.parcelIDs.split("%");
  }

  updateParcel(e:any ,parcel) {
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
      console.log(this.checkedParcels);
  }

  onConfirmParcelHandover() {
      for(let checkedParcel of this.checkedParcels){
          this.toursService.updateDeliveredParcels(this.loadedTour.tourID, checkedParcel).subscribe();
      }
      if(this.checkedParcels.length = this.getParcels().length){
          this.toursService.updateCompletedStops(this.loadedTour.tourID, this.getReceiverId()).subscribe();
      }
      this.onBack();
  }

}
