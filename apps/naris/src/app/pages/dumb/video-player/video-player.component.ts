import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import Player from '@vimeo/player';

@Component({
  selector: 'soer-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  @Input() videoId = '';
  @Input() videoSource: 'youtube' | 'vimeo' = 'youtube';
  apiLoaded = false;

  private player: Player | null = null;
  @ViewChild('vimeoPlayer', { static: false }) vimeo!: ElementRef;

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
    

  }

  ngAfterViewInit(): void {
    if (this.videoSource === 'vimeo') {
      this.player = new Player(this.vimeo.nativeElement,
        {autoplay: true});
    }
  }

  getVimeoId(): SafeUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${this.videoId}?quality=720p`);
  }
}
