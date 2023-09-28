import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelItineraryFormComponent } from './travel-itinerary-form.component';

describe('TravelItineraryFormComponent', () => {
  let component: TravelItineraryFormComponent;
  let fixture: ComponentFixture<TravelItineraryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelItineraryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelItineraryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
