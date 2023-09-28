import { Component, OnInit } from '@angular/core';
import { Destination } from 'src/app/shared/models/destination.model';

@Component({
  selector: 'app-popular-destinations',
  templateUrl: './popular-destinations.component.html',
  styleUrls: ['./popular-destinations.component.css']
})
export class PopularDestinationsComponent implements OnInit {

  public popularDestinations: Destination[];

  constructor() { }

  ngOnInit(): void {
    this.initializePopularDestinations();
  }

  private initializePopularDestinations(): void {
    this.popularDestinations = [
      {
        countryName: 'Palawan, Philippines',
        destinationCount: 20
      },
      {
        countryName: 'Bangkok, Thailand',
        destinationCount: 15
      },
      {
        countryName: 'Paris, France',
        destinationCount: 12
      },
      {
        countryName: 'Tokyo, Japan',
        destinationCount: 10
      },
    ];
  }


}
