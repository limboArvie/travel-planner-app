import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TravelService } from 'src/app/core/services/travel.service';
import { Travel } from '../../shared/models/travel.model';

@Component({
  selector: 'app-travel-card',
  templateUrl: './travel-card.component.html',
  styleUrls: ['./travel-card.component.css']
})
export class TravelCardComponent implements OnInit {
  @Input() travel: Travel;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public viewTravelDetails(): void {
    if (!(this.travel && this.travel.id)) {
      return;
    }
    this.router.navigate(['/travels', this.travel.id]);
  }
}
