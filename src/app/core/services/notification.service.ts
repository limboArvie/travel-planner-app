import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TravelNotification } from 'src/app/shared/models/travel-notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public newTravelList$: BehaviorSubject<TravelNotification[]> = new BehaviorSubject<TravelNotification[]>([]);
  constructor() { }
}
