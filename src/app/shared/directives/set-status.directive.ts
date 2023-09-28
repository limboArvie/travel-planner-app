import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appSetStatus]'
})
export class SetStatusDirective implements OnInit {

  @Input() appSetStatus: string;

  constructor() { }

  @HostBinding('class') class = '';

  ngOnInit(): void {
    this.class = this.setStatusClass();
  }

  private setStatusClass(): string{
    let className = '';
    switch (this.appSetStatus.toUpperCase()){
      case 'ONGOING':
        className = 'btn-primary';
        break;
      case 'COMPLETED':
        className = 'btn-success';
        break;
      case 'WAITING':
      case 'PENDING':
        className = 'btn-warning';
        break;
      case 'CANCELLED':
        className = 'btn-danger';
        break;
      case 'DRAFT':
        className = 'btn-info';
        break;
      default:
        className = 'btn-info';
        break;
    }
    return className;
  }

}
