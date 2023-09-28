import { Component, OnInit, OnDestroy } from '@angular/core';
import { Travel } from '../../shared/models/travel.model';
import { TravelService } from 'src/app/core/services/travel.service';
import { TravelSearchService } from 'src/app/core/services/travel-search.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit, OnDestroy {

  public filteredTravelList: Travel[] = [];
  public travelList: Travel[] = [];
  public selectedTravelId: number;
  public showTravelList = true;
  public showTravelForm = true;
  public showTravelDetails = false;

  constructor(
    private travelService: TravelService,
    private travelSearchService: TravelSearchService
  ) { }

  ngOnInit(): void {
    this.initializeTravelGoals();
    this.searchTravelGoal();
  }

  ngOnDestroy(): void {
    // this.travelSearchService.searchKey$.unsubscribe();
  }
  public deletedTravelGoal(): void {
    this.initializeTravelGoals();
    this.showTravelList = true;
    this.showTravelDetails = false;
    this.showTravelForm = true;
  }

  public displayTravelForm(): void {
    this.showTravelForm = true;
  }

  public newTravelAdded(): void {
    this.initializeTravelGoals();
  }

  public trackByTravelId = (index, travel) => {
    return travel?.id;
  }

  public viewTravelDetails(travelId: number): void {
    this.selectedTravelId = travelId;
    this.showTravelList = false;
    this.showTravelDetails = true;
    this.showTravelForm = false;
  }

  private initializeTravelGoals(): void {
    this.travelService.getAll().subscribe(travelGoals => {
      this.travelList = travelGoals;
      this.filteredTravelList = travelGoals;
    });
  }

  private searchTravelGoal(): void {
    this.travelSearchService.searchKey$.subscribe(searchKey => {
      if (searchKey){
        this.filteredTravelList = this.travelList.filter(travel => travel.name.toLowerCase().indexOf(searchKey.trim().toLowerCase()) > -1);
      }
      else {
        this.filteredTravelList = this.travelList;
      }
    });
  }
}
