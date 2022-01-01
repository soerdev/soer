import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-roadmap-edit-form',
  templateUrl: './roadmap-edit-form.component.html',
  styleUrls: ['./roadmap-edit-form.component.scss']
})
export class RoadmapEditFormComponent implements OnInit, AfterViewInit {

  @Input() title: string;
  @ViewChild('titleElem') titleElem: any;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.titleElem.nativeElement.focus();
  }

}
