import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AimModel, EMPTY_AIM } from '../interfaces/aim.model';

@Component({
  selector: 'soer-aim-raw',
  templateUrl: './aim-raw.component.html',
  styleUrls: ['./aim-raw.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AimRawComponent {
  public readonly gradientColors = { '0%': '#ff0000', '50%': '#ff0000', '75%': '#ff9900', '100%': '#0f0' };
  @Input() isExpand = false;
  @Input() aim: AimModel = EMPTY_AIM;
  @Output() update: EventEmitter<AimModel> = new EventEmitter<AimModel>();
  @Output() expand: EventEmitter<boolean> = new EventEmitter<boolean>();
  doneProgress = 100;


  toggle(): void {
    this.isExpand = !this.isExpand;
    this.expand.emit(this.isExpand);
  }
}
