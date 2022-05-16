import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'soer-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.scss']
})
export class NoContentComponent  {

  constructor(private router: Router, private route: ActivatedRoute) {}

  onClose(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.router.navigate(['.'], {relativeTo: this.route.parent, queryParams});
  }
}
