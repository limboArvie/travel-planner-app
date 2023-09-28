import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeConverterPipe } from './pipes/time-converter.pipe';
import { FormErrorDisplayComponent } from './components/form-error-display/form-error-display.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SetStatusDirective } from './directives/set-status.directive';
import { IsAuthorizedDirective } from './directives/is-authorized.directive';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';



@NgModule({
  declarations: [
    TimeConverterPipe,
    FormErrorDisplayComponent,
    PageNotFoundComponent,
    SetStatusDirective,
    IsAuthorizedDirective,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeConverterPipe,
    FormErrorDisplayComponent,
    PageNotFoundComponent,
    SetStatusDirective,
    IsAuthorizedDirective,
    UnauthorizedComponent
  ]
})
export class SharedModule { }
