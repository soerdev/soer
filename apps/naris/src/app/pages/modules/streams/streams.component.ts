import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'soer-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {

  public streams: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.streams = this.route.snapshot.data?.['streams'];
  }

  showVideo(youtube_id: string): void {
      this.router.navigate([youtube_id], {relativeTo: this.route})
      .catch(e => console.error(`
        StreamComponent: в RouteModule необходимо указать маршрут для проигрывания видео
          children: [
            {
              path: ':videoId',
              component: ComposeVideoPlayerComponent,
              data: { header: {title: 'Смотрим стрим...'}}
            }
          ]
      `));
  }
}
