import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-depot-handover',
  templateUrl: './depot-handover.page.html',
  styleUrls: ['./depot-handover.page.scss'],
})
export class DepotHandoverPage implements OnInit {
    parcelIDs: string;
    checkedParcels: string[] = [];
    submitButtonDisabled = false;

  constructor(
      private navCtrl: NavController,
      private route: ActivatedRoute) { }

  ngOnInit() {
      this.parcelIDs = this.route.snapshot.paramMap.get('depotParcelIDs');
      this.checkedParcels = this.getParcels();
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
