import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-compose-video-player',
  templateUrl: './compose-video-player.component.html',
  styleUrls: ['./compose-video-player.component.scss']
})
export class ComposeVideoPlayerComponent implements OnInit, OnDestroy {

  videoId = null;
  subscription;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params) => this.videoId = params.videoId
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onClose(): void {
    this.router.navigate(['.'], {relativeTo: this.route.parent});
  }

}
