import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Player from '@vimeo/player';

@Component({
  selector: 'soer-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  @Input() videoId = '';
  @Input() videoSource: 'youtube' | 'vimeo' = 'youtube';
  public isLoading = true;

  private player: Player | null = null;
  @ViewChild('vimeoPlayer', { static: false }) vimeo!: ElementRef;

  ngOnInit(): void {
    if (this.isLoading && this.videoSource === 'youtube') {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.isLoading = false;
    }
    

  }

  ngAfterViewInit(): void {
    if (this.videoSource === 'vimeo') {
      this.player = new Player(this.vimeo.nativeElement,
        {autoplay: true, dnt: true});
      this.player.on('loaded', () => this.isLoading = false);

      const vimeo_storage_id = `vimeo_video_${this.videoId}`;
      const seconds = parseInt(localStorage.getItem(vimeo_storage_id) || '0');
      if (seconds > 0) {
        this.player.setCurrentTime(seconds);
      }
      this.player.on('timeupdate', (data) => localStorage.setItem(vimeo_storage_id, data.seconds + ''));
    }
  }
}
