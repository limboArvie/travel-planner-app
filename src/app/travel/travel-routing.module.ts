import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TravelFormComponent } from './travel-form/travel-form.component';
import { TravelDetailsComponent } from './travel-details/travel-details.component';
import { TravelListComponent } from './travel-list/travel-list.component';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: TravelListComponent
  },
  {
    path: 'create',
    component: TravelFormComponent
  },
  {
    path: ':id',
    component: TravelDetailsComponent
  },
  {
    path: 'edit/:id',
    component: TravelFormComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TravelRoutingModule { }
