import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelService } from 'src/app/core/services/travel.service';
import { UserService } from 'src/app/core/services/user.service';
import { TravelActivity } from 'src/app/shared/models/travel-activity.model';
import { TravelItinerary } from 'src/app/shared/models/travel-itinerary.model';
import { Travel } from 'src/app/shared/models/travel.model';
import { User } from 'src/app/shared/models/user.model';
import { TravelFormValidator } from 'src/app/shared/validators/travel-form.validator';

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrls: ['./travel-form.component.css']
})
export class TravelFormComponent implements OnInit {

  public travelForm: FormGroup;
  public initialTravelFormForEditing: FormGroup;
  public newTravel: Travel;
  public currentUser: User;
  public travelId: number;
  public isForEditing: boolean;
  public isChangeDetected = false;

  constructor(
    private travelService: TravelService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  get contentsFromArray(): FormArray {
    return this.travelForm?.get('itineraries') as FormArray;
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserFromLocalStorage();
    this.initializeEmptyForm();
    this.checkIfForEditing();

    if (this.isForEditing){
      this.checkEditPermission();
    }
  }

  canDeactivate(): boolean {
    if (this.isChangeDetected) {
      const result = window.confirm('There are unsaved changes! Are you sure you want to leave the page?');
      return result;
    }
    return true;
  }

  public onAddItinerary(): void {
    const itineraryControl = new FormGroup({
      activityDate: new FormControl(null, [Validators.required, TravelFormValidator.validDate, TravelFormValidator.pastDate]),
      activities: new FormArray([
        new FormGroup({
          activityName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
          activityTime: new FormControl(null, [Validators.required]),
          activityDescription: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)])
        })
      ])
    });

    const itineraries = this.travelForm?.get('itineraries') as FormArray;
    itineraries.push(itineraryControl);
  }

  public onSubmit(): void {
    if (this.travelForm.valid) {
      this.mapTravelGoal(this.travelForm.value);
      this.checkIfTravelReachedRequiredTravellers();
      if (this.isForEditing){
        this.travelService.update(this.newTravel).subscribe(() => {
          this.isChangeDetected = false;
          this.router.navigate(['/travels', this.travelId]);
        });
      }
      else {
          this.travelService.add(this.newTravel).subscribe(() => {
            this.travelForm.reset();
            this.populateDefaultValues();
            this.router.navigate(['/travels']);
          });
      }

      this.travelForm.reset();
      this.populateDefaultValues();
    }
  }

  private checkEditPermission(): void {
    this.route.paramMap.subscribe(param => {
      this.travelId = +param.get('id');
    });

    this.travelService.getById(this.travelId).subscribe(travelGoal => {
      if (travelGoal.organizer.id !== this.currentUser.id) {
        this.router.navigate(['/unauthorized']);
      }
      this.initializeEditForm(travelGoal);
    });
  }

  private checkIfForEditing(): void {
    this.isForEditing = this.router.url.indexOf('/edit') > -1 ? true : false;
  }

  private checkIfTravelReachedRequiredTravellers(): void {
    if (this.newTravel.joinedTravelers.length === this.newTravel.requiredTravelersCount){
      this.newTravel.status = 'Waiting';
    }
  }

  private initializeEditForm(travelToEdit): void {
    this.newTravel = travelToEdit;
    this.travelForm = new FormGroup({
      name: new FormControl(travelToEdit.name, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      place: new FormControl(travelToEdit.place, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      imageUrl: new FormControl(travelToEdit.imageUrl, [Validators.required]),
      description: new FormControl(travelToEdit.description,
        [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      departureDate: new FormControl(travelToEdit.departureDate.split('T')[0],
        [Validators.required, TravelFormValidator.validDate, TravelFormValidator.pastDate]),
      departureTime: new FormControl(travelToEdit.departureTime, [Validators.required]),
      returnDate: new FormControl(travelToEdit.returnDate.split('T')[0],
        [Validators.required, TravelFormValidator.validDate, TravelFormValidator.pastDate]),
      returnTime: new FormControl(travelToEdit.returnTime, [Validators.required]),
      requiredTravelersCount: new FormControl(travelToEdit.requiredTravelersCount,
        [Validators.required, Validators.min(2), Validators.max(100)]),
      status: new FormControl(travelToEdit.status),
      organizer: new FormControl(this.currentUser),
      joinedTravelers: new FormControl(travelToEdit.joinedTravelers),
      itineraries: new FormArray([])
    });

    const itineraryString = 'itineraries';
    const itineraries = this.travelForm?.controls[itineraryString] as FormArray;

    travelToEdit.itinerary.forEach((itinerary, index) => {
        const newItinerary = new FormGroup({
          activityDate: new FormControl(itinerary.activityDate.split('T')[0],
            [Validators.required, TravelFormValidator.validDate, TravelFormValidator.pastDate]),
          activities: new FormArray([])
        });
        const activities = 'activities';
        const activityList = newItinerary?.controls[activities] as FormArray;

        travelToEdit.itinerary[index].activities.forEach(activity => {
          activityList.push(new FormGroup({
            activityName: new FormControl(activity.activityTitle, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            activityTime: new FormControl(activity.activityTime, [Validators.required]),
            activityDescription: new FormControl(activity.activityDescription,
              [Validators.required, Validators.minLength(5), Validators.maxLength(250)])
          }));
        });
        itineraries.push(newItinerary);
    });
    this.travelForm.markAllAsTouched();
    this.initialTravelFormForEditing = this.travelForm;

    this.travelForm.valueChanges.subscribe(travelData => {
      this.isChangeDetected = true;
    });
  }

  private initializeEmptyForm(): void {
    this.travelForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      place: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      imageUrl: new FormControl('https://picsum.photos/650/450', [Validators.required]),
      description: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      departureDate: new FormControl(null, [Validators.required, TravelFormValidator.validDate, TravelFormValidator.pastDate]),
      departureTime: new FormControl(null, [Validators.required]),
      returnDate: new FormControl(null, [Validators.required, TravelFormValidator.validDate, TravelFormValidator.pastDate]),
      returnTime: new FormControl(null, [Validators.required]),
      requiredTravelersCount: new FormControl(null, [Validators.required, Validators.min(2), Validators.max(100)]),
      status: new FormControl('Draft'),
      organizer: new FormControl(this.currentUser),
      joinedTravelers: new FormControl([this.currentUser]),
      itineraries: new FormArray([
        new FormGroup({
          activityDate: new FormControl(null, [Validators.required, TravelFormValidator.validDate, TravelFormValidator.pastDate]),
          activities: new FormArray([
            new FormGroup({
              activityName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
              activityTime: new FormControl(null, [Validators.required]),
              activityDescription: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)])
            })
          ])
        })
      ])
    });
  }

  private mapTravelGoal(travelValues: any): void {
    this.newTravel = {
      id: this.isForEditing ? this.travelId : 0,
      imageUrl: travelValues?.imageUrl,
      name: travelValues?.name,
      place: travelValues?.place,
      description: travelValues?.description,
      departureDate: new Date(travelValues?.departureDate),
      departureTime: travelValues?.departureTime,
      returnDate: new Date(travelValues?.returnDate),
      returnTime: travelValues?.returnTime,
      status: travelValues?.status,
      organizer: travelValues?.organizer,
      requiredTravelersCount: travelValues?.requiredTravelersCount,
      joinedTravelers: travelValues?.joinedTravelers,
      itinerary: []
    };
    travelValues?.itineraries.forEach(itinerary => {
      const newItinerary: TravelItinerary = {
        activityDate: new Date(itinerary.activityDate),
        activities: []
      };

      itinerary.activities.forEach(activity => {
        const newActivity: TravelActivity = {
          activityTitle: activity.activityName,
          activityDescription: activity.activityDescription,
          activityTime: activity.activityTime
        };
        newItinerary.activities.push(newActivity);
      });

      this.newTravel.itinerary.push(newItinerary);
    });
  }

  private populateDefaultValues(): void {
    this.travelForm.patchValue({
      imageUrl: 'https://picsum.photos/650/450',
      status: 'Draft',
      organizer: this.currentUser
    });
  }
}
