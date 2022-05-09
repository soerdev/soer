import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoModel } from '../../../api/streams/stream.model';


@Component({
  selector: 'soer-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit {

  public streams: VideoModel[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.streams = this.route.snapshot.data?.['streams'] || [];
  }

  showVideo(video: VideoModel): void {

    let videoId = video.youtube_id;
    let videoSource = 'youtube';
    if (video.vimeo_id) {
      videoId = video.vimeo_id;
      videoSource = 'vimeo';
    } 
      this.router.navigate([videoSource, videoId], {relativeTo: this.route})
      .catch(() => console.error(`
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
