import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedTravelComponent } from './featured-travel.component';

describe('FeaturedTravelComponent', () => {
  let component: FeaturedTravelComponent;
  let fixture: ComponentFixture<FeaturedTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
