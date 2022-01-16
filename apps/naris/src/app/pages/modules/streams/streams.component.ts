import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface VideoModel {
  vimeo_id?: string;
  youtube_id: string;
  title: string;
  desc: string;
}
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

  showVideo(video: VideoModel): void {

    let videoId = video.youtube_id;
    let videoSource = 'youtube';
    if (video.vimeo_id) {
      videoId = video.vimeo_id;
      videoSource = 'vimeo';
    } 
      this.router.navigate([videoSource, videoId], {relativeTo: this.route})
      .catch(e => console.error(`
        StreamComponent: в RouteModule необходимо указать маршрут для проигрывания видео
          children: [
            {
              path: ':videoSource/:videoId',
              component: ComposeVideoPlayerComponent,
              data: { header: {title: 'Смотрим стрим...'}}
            }
          ]
      `));
  }
}
