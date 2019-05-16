import {Component, OnInit} from '@angular/core';
import {TourDataService} from "../tour-data.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private toursService: TourDataService) { }

  ngOnInit() {
  }

  onLoadData() {
    this.toursService.fetchTours().subscribe();
  }

}
