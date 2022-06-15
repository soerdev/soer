import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ANY_SERVICE, MixedBusService } from '@soer/mixed-bus';
import { Subscription } from 'rxjs';
import { WatchVideoEvent } from '../../../api/progress/events/watch-video.event';

@Component({
  selector: 'soer-compose-video-player',
  templateUrl: './compose-video-player.component.html',
  styleUrls: ['./compose-video-player.component.scss']
})
export class ComposeVideoPlayerComponent implements OnInit, OnDestroy {

  public videoId = null;
  public videoSource: 'youtube' | 'vimeo' = 'youtube';
  subscription: Subscription | null = null;
  constructor(private route: ActivatedRoute, private router: Router, private Bus$: MixedBusService) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params) => {
        this.videoId = params?.['videoId'];
        this.videoSource = params?.['videoSource'] || 'youtube';
        this.Bus$.publish(new WatchVideoEvent(ANY_SERVICE, {videoId: this.videoId + ''}));
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onClose(): void {
    this.router.navigate(['.'], {relativeTo: this.route.parent, queryParams: {fid: this.route.snapshot.queryParams['fid']}});
  }

}
