import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'soer-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  data;
  constructor(private route: ActivatedRoute,
  ) {
    this.data = this.route.snapshot.data;}
}
