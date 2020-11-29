import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  sound = new Howl({
    src: ['assets/mp3/sample.mp3']
  });

  constructor() { }

  playAudio(){
    this.sound.play();
  }

  audioStop(){
    this.sound.stop();
  }
}
