import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {CurrentTourService} from "../current-tour.service";

@Component({
  selector: 'app-receiver-handover',
  templateUrl: './receiver-handover.page.html',
  styleUrls: ['./receiver-handover.page.scss'],
})
export class ReceiverHandoverPage implements OnInit {
    parcelIDs: string;
    checkedParcels: string[] = [];
    submitButtonDisabled = false;

  constructor(
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private currentTourService: CurrentTourService) { }

  ngOnInit() {
      this.parcelIDs = this.route.snapshot.paramMap.get('parcelID');
      this.checkedParcels = this.getParcels();
      console.log(this.checkedParcels);
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
      this.checkedParcels;
      this.onBack();
  }

}
