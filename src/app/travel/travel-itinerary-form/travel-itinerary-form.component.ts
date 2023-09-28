import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-travel-itinerary-form',
  templateUrl: './travel-itinerary-form.component.html',
  styleUrls: ['./travel-itinerary-form.component.css']
})
export class TravelItineraryFormComponent implements OnInit {
  @Input() itineraries: AbstractControl;
  @Input() formGroup: AbstractControl;

  constructor() { }

  ngOnInit(): void {
  }
  public onAddActivity(index: number): void {
    const activityControl = new FormGroup({
      activityName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      activityTime: new FormControl(null, [Validators.required]),
      activityDescription: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)])
    });

    const itineraries = this.formGroup.get('itineraries') as FormArray;
    const activites = itineraries?.controls[index].get('activities') as FormArray;
    activites.push(activityControl);
  }

}
