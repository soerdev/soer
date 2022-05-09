import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { OverlayComponent } from './overlay/overlay.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UnderDevelopmentComponent } from './under-development/under-development.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { SrTextEditComponent } from './sr-text-edit/sr-text-edit.component';
import { RouterModule } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';



@NgModule({
  declarations: [
    VideoPlayerComponent,
    OverlayComponent,
    AccessDeniedComponent,
    UnderDevelopmentComponent,
    AudioPlayerComponent,
    SrTextEditComponent
  ],
  imports: [
    CommonModule,
    YouTubePlayerModule,
    NzIconModule,
    NzResultModule,
    NzButtonModule,
    RouterModule,
    NzSpinModule
  ],
  exports: [
    VideoPlayerComponent,
    OverlayComponent,
    AccessDeniedComponent,
    UnderDevelopmentComponent,
    AudioPlayerComponent,
    SrTextEditComponent]
})
export class DumbModule { }
