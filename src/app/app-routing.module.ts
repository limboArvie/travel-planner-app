import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoginLayoutComponent } from './core/components/login-layout/login-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'travels',
        loadChildren: () => import('./travel/travel.module').then(m => m.TravelModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        component: PageNotFoundComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
