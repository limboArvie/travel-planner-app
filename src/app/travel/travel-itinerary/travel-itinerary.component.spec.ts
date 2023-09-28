import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelItineraryComponent } from './travel-itinerary.component';

describe('TravelItineraryComponent', () => {
  let component: TravelItineraryComponent;
  let fixture: ComponentFixture<TravelItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelItineraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
