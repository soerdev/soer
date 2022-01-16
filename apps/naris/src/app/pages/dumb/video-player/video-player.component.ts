import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'soer-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoId = '';
  @Input() videoSource: 'youtube' | 'vimeo' = 'youtube';
  apiLoaded = false;

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  getVimeoId(): SafeUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${this.videoId}?quality=720p`);
  }
}
