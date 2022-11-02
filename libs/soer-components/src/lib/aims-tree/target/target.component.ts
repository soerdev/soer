import { Component, Input, OnInit } from '@angular/core';
import { AimModel, EMPTY_AIM } from '../interfaces/aim.model';

@Component({
  selector: 'soer-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss'],
})
export class TargetComponent {
  public readonly gradientColors = { '0%': '#ff0000', '50%': '#ff0000', '75%': '#ff9900', '100%': '#0f0' };
  @Input() target: AimModel = EMPTY_AIM;

}
