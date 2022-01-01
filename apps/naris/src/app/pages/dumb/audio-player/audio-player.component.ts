import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  @Input() audioUrl: string;

  constructor() { }

  ngOnInit(): void {

  }



  changeSound(event, item) {
      this.audioUrl = '';
      const audioPlayer =  <HTMLAudioElement> document.getElementById('audio');
      if (audioPlayer) {
        audioPlayer.load();
      }
  }
}
