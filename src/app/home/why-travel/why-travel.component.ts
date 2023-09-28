import { Component, OnInit } from '@angular/core';
import { TravelReason } from 'src/app/shared/models/travel-reason.model';

@Component({
  selector: 'app-why-travel',
  templateUrl: './why-travel.component.html',
  styleUrls: ['./why-travel.component.css']
})
export class WhyTravelComponent implements OnInit {

  public travelReasons: TravelReason[];

  constructor() { }

  ngOnInit(): void {
    this.initializeTravelReasons();
  }

  private initializeTravelReasons(): void {
    this.travelReasons = [
      {
        reasonTitle: 'COMFORT',
        reasonIcon: '../../assets/icons/heart.png',
        reasonDescription: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
      },
      {
        reasonTitle: 'LUXURY HOTEL',
        reasonIcon: '../../assets/icons/hotel.png',
        reasonDescription: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
      },
      {
        reasonTitle: 'TRAVEL GUIDE',
        reasonIcon: '../../assets/icons/book.png',
        reasonDescription: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
      }
    ];
  }

}
