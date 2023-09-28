import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { TravelNotification } from 'src/app/shared/models/travel-notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  public newTravelGoals$ = new BehaviorSubject<TravelNotification[]>([]);

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.newTravelList$.subscribe(travelGoals => {
      this.newTravelGoals$.next(travelGoals);
    });
  }

  ngOnDestroy(): void {
    // this.notificationService.newTravelList$.unsubscribe();
  }

}
