import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-display',
  templateUrl: './form-error-display.component.html',
  styleUrls: ['./form-error-display.component.css']
})
export class FormErrorDisplayComponent implements OnInit {
  @Input() formControlElement: AbstractControl;
  @Input() fieldName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
