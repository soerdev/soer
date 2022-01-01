import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
;

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  @Input() activate = true;
  // tslint:disable-next-line: no-output-native
  @Output() readonly close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  clickOnOverlay(event): void {
    if (event.target.id === 'overlay') {
      this.close.emit();
    }
  }
}
