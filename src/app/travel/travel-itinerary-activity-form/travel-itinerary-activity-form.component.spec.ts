import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelItineraryActivityFormComponent } from './travel-itinerary-activity-form.component';

describe('TravelItineraryActivityFormComponent', () => {
  let component: TravelItineraryActivityFormComponent;
  let fixture: ComponentFixture<TravelItineraryActivityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelItineraryActivityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelItineraryActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
