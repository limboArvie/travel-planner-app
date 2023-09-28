import { Component, Input, OnInit } from '@angular/core';
import { TravelItineraryView } from 'src/app/shared/models/travel-itinerary-view.model';
import { TravelItinerary } from 'src/app/shared/models/travel-itinerary.model';

@Component({
  selector: 'app-travel-itinerary',
  templateUrl: './travel-itinerary.component.html',
  styleUrls: ['./travel-itinerary.component.css']
})
export class TravelItineraryComponent implements OnInit {
  @Input() itineraries: TravelItinerary[];

  public itineraryList: TravelItineraryView[] = [];
  public showAccordion = false;
  constructor() { }

  ngOnInit(): void {
    this.setItineraryList();
  }

  public setItineraryList(): void {
    this.itineraries.forEach(itinerary => {
      this.itineraryList.push(new TravelItineraryView(itinerary));
    });
    if (this.itineraryList.length !== 0){
      this.itineraryList[0].isCollapsed = true;
    }
  }

  public toggleAccordion(): void {
    this.showAccordion = !this.showAccordion;
  }

}
