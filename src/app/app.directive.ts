import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appDirective]'
})
export class AppDirective {

  constructor(public viewContainerREf: ViewContainerRef) { }

}

