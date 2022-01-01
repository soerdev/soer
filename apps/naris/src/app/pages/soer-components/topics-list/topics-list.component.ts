import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'soer-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.scss']
})
export class TopicsListComponent implements OnInit {

  @Input() topics: {overview: string, title: string}[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
