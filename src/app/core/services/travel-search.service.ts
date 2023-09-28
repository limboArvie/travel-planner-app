import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelSearchService {

  public searchKey$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }
}
