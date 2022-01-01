import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {

  webFiles = [];


  constructor(private route: ActivatedRoute,
              private message: NzMessageService
    ) { }

  ngOnInit(): void {
    this.webFiles = this.route.snapshot.data.webfiles;
  }

  url(file, level): string {
    return `${environment.assetsUrl}${level}/${file}`;
  }

  download(event, file): void {
    if(file.icon === 'lock') {
      this.message.error(`Для скачивания этого файла нужен уровень ${file.level.toUpperCase()}`);
      event.preventDefault();
    }
  }
}
