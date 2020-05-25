import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-video',
  template: `
    <video
      style="width: 100vw"
      id="video"
      preload="auto"
      webkit-playsinline="true"
      playsinline=""
      x5-playsinline="true"
      x-webkit-airplay="true"
      controls="controls"
    >
      <source [src]="src">
    </video>
    <div>
      <h1>states</h1>
      {{states|json}}
    </div>
    <div>
      <h1>debug</h1>
    </div>
  `,
  styles: []
})
export class VideoComponent implements OnInit {
  src = 'http://zhibo2.hst778.com/anhui/anhui.m3u8';
  // src = 'http://zhibo2.hst778.com/anhui1/anhui1.m3u8';
  info: any = {};
  states = [];
  video: HTMLVideoElement;

  constructor() {
  }

  ngOnInit(): void {
    this.video = document.getElementById('video') as HTMLVideoElement;
    this.video.defaultMuted = true;
    this.video.onplaying = () => {
      this.states.push('onplaying');
      // this.info = video.audioTracks;
    };
    this.video.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
      this.states.push('onerror');
    };
    this.video.onabort = () => {
      this.states.push('onabort');
      // this.info = arguments;
    };
  }

}
