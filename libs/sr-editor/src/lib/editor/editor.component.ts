import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'soer-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {

  @Input() document: any;

  constructor() {}

  ngOnInit(): void {}
}
