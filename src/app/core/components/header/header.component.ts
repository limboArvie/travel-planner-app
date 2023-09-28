import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelSearchService } from '../../services/travel-search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private travelSearchService: TravelSearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  public searchTravelGoal(searchKey): void {
    this.travelSearchService.searchKey$.next(searchKey);
  }
}
