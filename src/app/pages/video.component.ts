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
      {{info|json}}
    </div>
  `,
  styles: []
})
export class VideoComponent implements OnInit {
  // src = 'http://zhibo2.hst778.com/anhui/anhui.m3u8';
  // src = 'http://zhibo.qex713.com/fightsport/fightsport.m3u8';
  src = 'https://vue5.oss-cn-beijing.aliyuncs.com/assets/videos/0.mp4';
  info: any = {};
  states = [];

  constructor() {
  }

  ngOnInit(): void {
    const video = document.getElementById('video') as HTMLVideoElement;
    video.onplaying = () => {
      this.states.push('onplaying');
      // this.info = video.audioTracks;
    };
    video.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
      this.states.push('onerror');
      this.info = error;
    };
    video.onabort = () => {
      this.states.push('onabort');
      // this.info = arguments;
    };
  }

}
