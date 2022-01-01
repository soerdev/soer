import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'soer-roadmap-edit-form',
  templateUrl: './roadmap-edit-form.component.html',
  styleUrls: ['./roadmap-edit-form.component.scss']
})
export class RoadmapEditFormComponent implements AfterViewInit {

  @Input() title = '';
  @ViewChild('titleElem') titleElem: any;

  ngAfterViewInit(): void {
    this.titleElem.nativeElement.focus();
  }

}
