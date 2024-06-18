import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardColor]',
  standalone: true
})
export class CardColorDirective {
  @Input('appCardColor') set backgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}


@Directive({
    selector: '[appCardBorderColor]',
    standalone: true
  })
  export class CardBorderColorDirective {
    @Input('appCardBorderColor') set borderColor(color: string) {
      this.renderer.setStyle(this.el.nativeElement, 'border', `2px solid ${color}`);
    }
  
    constructor(private el: ElementRef, private renderer: Renderer2) {}
  }
  