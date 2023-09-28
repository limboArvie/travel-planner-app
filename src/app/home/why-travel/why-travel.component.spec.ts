import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyTravelComponent } from './why-travel.component';

describe('WhyTravelComponent', () => {
  let component: WhyTravelComponent;
  let fixture: ComponentFixture<WhyTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
