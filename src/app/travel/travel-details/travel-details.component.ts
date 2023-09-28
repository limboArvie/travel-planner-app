import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelService } from 'src/app/core/services/travel.service';
import { UserService } from 'src/app/core/services/user.service';
import { Travel } from 'src/app/shared/models/travel.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.css']
})
export class TravelDetailsComponent implements OnInit {
  @Input() travelId: number;

  public travel: Travel;
  public showItinerary = false;
  public showDeleteButton = false;
  public disableJoinButton = false;
  public currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private travelService: TravelService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserFromLocalStorage();
    this.initializeTravelGoal();
  }

  public displayItinerary(): void {
    this.showItinerary = !this.showItinerary;
  }

  public deleteTravelGoal(id: number): void{
    const confirmDelete = confirm('Are you sure you want to delete this travel goal?');
    if (confirmDelete){
      this.travelService.delete(id).subscribe(() => {
        this.router.navigate(['/travels']);
      });
    }
  }

  public editTravelGoal(id: number): void{
    this.router.navigate(['/travels/edit', id]);
  }

  public joinTravelGoal(): void {
    const result = window.confirm('Do you want to join this travel goal?');
    if (result){
      this.travel.joinedTravelers.push(this.currentUser);
      this.checkIfTravelReachedRequiredTravellers();
      this.travelService.update(this.travel).subscribe(travelGoal => {
        this.router.navigate(['/travels', this.travelId]);
      });
    }
  }

  public updateStatus(status: string): void {
    if (this.travel?.status.toUpperCase() !== status.toUpperCase()){
      this.travel.status = status;
      this.travelService.update(this.travel).subscribe(travelGoal => {
        this.router.navigate(['**']).then(() => {
          this.router.navigate(['/travels', this.travelId]);
        });
      });
    }
  }

  private initializeTravelGoal(): void{
    this.route.paramMap.subscribe(param => {
      this.travelId = +param.get('id');
    });
    this.travelService.getById(this.travelId).subscribe(travelGoal => {
      this.travel = travelGoal;
      this.checkIfToShowDeleteButton();
      this.checkIfUserAlreadyJoined();
    });
  }

  private checkIfToShowDeleteButton(): void{
    if (this.travel?.status.toUpperCase() === 'DRAFT'){
      this.showDeleteButton = true;
    }
  }

  private checkIfUserAlreadyJoined(): void {
    if (this.travel.joinedTravelers.find(x => x.id === this.currentUser.id)) {
      this.disableJoinButton = true;
    }
  }

  private checkIfTravelReachedRequiredTravellers(): void {
    if (this.travel.joinedTravelers.length === this.travel.requiredTravelersCount){
      this.travel.status = 'Waiting';
    }
  }
}
