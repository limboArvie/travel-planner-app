import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelComponent } from './travel.component';
import { TravelListComponent } from './travel-list/travel-list.component';
import { TravelCardComponent } from './travel-card/travel-card.component';
import { TravelDetailsComponent } from './travel-details/travel-details.component';
import { TravelItineraryComponent } from './travel-itinerary/travel-itinerary.component';
import { TravelFormComponent } from './travel-form/travel-form.component';
import { TravelItineraryFormComponent } from './travel-itinerary-form/travel-itinerary-form.component';
import { TravelItineraryActivityFormComponent } from './travel-itinerary-activity-form/travel-itinerary-activity-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TravelRoutingModule } from './travel-routing.module';


@NgModule({
  declarations: [
    TravelComponent,
    TravelListComponent,
    TravelCardComponent,
    TravelDetailsComponent,
    TravelItineraryComponent,
    TravelFormComponent,
    TravelItineraryFormComponent,
    TravelItineraryActivityFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    TravelRoutingModule
  ]
})
export class TravelModule { }
