import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CarouselComponent } from './carousel/carousel.component';
import { PopularDestinationsComponent } from './popular-destinations/popular-destinations.component';
import { FeaturedTravelComponent } from './featured-travel/featured-travel.component';
import { WhyTravelComponent } from './why-travel/why-travel.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    PopularDestinationsComponent,
    FeaturedTravelComponent,
    WhyTravelComponent,
    TestimonialComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
