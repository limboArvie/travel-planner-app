import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Directive({
  selector: '[appIsAuthorized]'
})
export class IsAuthorizedDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private userService: UserService
  ) { }

  @Input() set appIsAuthorized(param: any) {
    const currentUser = this.userService.getUserFromLocalStorage();
    if (currentUser?.id === param.id && param.isForOrganizerView){
      this.vcr.createEmbeddedView(this.templateRef);
    } else if (currentUser?.id !== param.id && !param.isForOrganizerView){
        this.vcr.createEmbeddedView(this.templateRef);
    } else {
      this.vcr.clear();
    }
  }
}
