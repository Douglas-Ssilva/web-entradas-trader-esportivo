import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
  <small *ngIf="isThereError()" class="p-error">
    {{ text }}
  </small>
  `
})
export class MessageComponent {


  @Input() control: any;
  @Input() text: string = '';
  @Input() error: string = '';

  isThereError() : boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
