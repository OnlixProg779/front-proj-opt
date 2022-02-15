import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocusInvalidInput]',
})
export class AutoFocusInvalidInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('submit')
  onFormSubmit() {
    const invalidInputControl =
      this.el.nativeElement.querySelector('.ng-invalid');

    if (invalidInputControl) {
      // invalidInputControl.classList.add('ng-touched');
      // invalidInputControl.classList.remove('ng-untouched');
      invalidInputControl.focus();

      // invalidInputControl.removeClass('ng-untouched');
      // invalidInputControl.addClass('ng-touched');

    }
  }
}
