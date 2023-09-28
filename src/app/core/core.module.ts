import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    SideMenuComponent,
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    NotificationComponent,
    LoginLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    RouterModule,
    MainLayoutComponent,
    LoginLayoutComponent
  ]
})
export class CoreModule { }
