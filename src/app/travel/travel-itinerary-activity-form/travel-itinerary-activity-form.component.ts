import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-travel-itinerary-activity-form',
  templateUrl: './travel-itinerary-activity-form.component.html',
  styleUrls: ['./travel-itinerary-activity-form.component.css']
})
export class TravelItineraryActivityFormComponent implements OnInit {
  @Input() activity: AbstractControl;

  constructor() { }

  ngOnInit(): void {
  }

}
