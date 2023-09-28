import { Component, OnInit } from '@angular/core';
import { TravelService } from 'src/app/core/services/travel.service';
import { Travel } from 'src/app/shared/models/travel.model';

@Component({
  selector: 'app-featured-travel',
  templateUrl: './featured-travel.component.html',
  styleUrls: ['./featured-travel.component.css']
})
export class FeaturedTravelComponent implements OnInit {

  public featuredTravels: Travel[];

  constructor(
    private travelService: TravelService
  ) { }

  ngOnInit(): void {
    this.initializeFeaturedTravels();
  }

  private initializeFeaturedTravels(): void {
    this.travelService.getAll().subscribe(travelGoals => {
      this.featuredTravels = travelGoals.slice(0, 4);
    });
  }

}
