import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-current-tour',
  templateUrl: './current-tour.page.html',
  styleUrls: ['./current-tour.page.scss'],
})
export class CurrentTourPage implements OnInit {

  constructor(private router: Router, private navCtrl: NavController,) { }

  ngOnInit() {
  }

  onBackHome() {
    this.navCtrl.navigateBack('/home');
  }

}
