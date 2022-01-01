import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'soer-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {

  webFiles = [];


  constructor(private route: ActivatedRoute,
              private message: NzMessageService
    ) { }

  ngOnInit(): void {
    this.webFiles = this.route.snapshot.data['webfiles'];
  }

  url(file: any, level: any): string {
    return `${environment.assetsUrl}${level}/${file}`;
  }

  download(event: any, file: any): void {
    if(file.icon === 'lock') {
      this.message.error(`Для скачивания этого файла нужен уровень ${file.level.toUpperCase()}`);
      event.preventDefault();
    }
  }
}
