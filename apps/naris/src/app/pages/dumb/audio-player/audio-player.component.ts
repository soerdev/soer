import { Component, Input } from '@angular/core';

@Component({
  selector: 'soer-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent {

  @Input() audioUrl = '';

  changeSound(event: any, item: any) {
      this.audioUrl = '';
      const audioPlayer =  <HTMLAudioElement> document.getElementById('audio');
      if (audioPlayer) {
        audioPlayer.load();
      }
  }
}
