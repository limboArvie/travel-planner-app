import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TravelNotification } from 'src/app/shared/models/travel-notification.model';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(
    private notificationService: NotificationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse
          && request.url === 'http://localhost:3000/travels'
          && event.status === 201
          && request.method === 'POST') {
          const newTravelNotification = new TravelNotification();
          newTravelNotification.travel = event.body;
          newTravelNotification.action = 'POST';
          this.notificationService.newTravelList$.next([...this.notificationService.newTravelList$.getValue(), newTravelNotification]);
        }
        else if (event instanceof HttpResponse
          && request.url.indexOf('http://localhost:3000/travels') > -1
          && event.status === 200
          && request.method === 'PUT') {
          const newTravelNotification = new TravelNotification();
          newTravelNotification.travel = event.body;
          newTravelNotification.action = 'PUT';
          this.notificationService.newTravelList$.next([...this.notificationService.newTravelList$.getValue(), newTravelNotification]);
        }
      })
    );
  }
}
