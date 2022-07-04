import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'soer-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
  @Input() userInfo: any;
  @Input() menuItems: any;
  @Output() logout = new EventEmitter<boolean>();
  @Output() check = new EventEmitter<any>();

}
