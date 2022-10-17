
import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
	selector: "[soerAutoresize]" // Attribute selector
})
export class TextareaAutoresizeDirective {
	@HostListener('input', ['$event.target'])
	onInput(): void {
		this.adjust();
  }
  
	constructor(public element: ElementRef) {
  }
  
	ngOnInit(): void {
    if (this.element.nativeElement.scrollHeight) {
      setTimeout(() => this.adjust());
    }
  }
  
	adjust(): void {
    const ta = this.element.nativeElement;
    this.element.nativeElement.style.height = '0';
    this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 10 + 'px';
	}

}