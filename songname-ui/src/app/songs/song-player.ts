import {environment} from "../../environments/environment";

export class SongPlayer {

  readonly DEFAULT_TIME_LIMIT = 1;
  readonly DEFAULT_INIT_POINTS = 10;

  songUuid: string;
  audio: any;
  timeLimit: number;
  points: number;

  constructor(timeLimit: number, points: number) {
    this.audio = new Audio();
    this.timeLimit = timeLimit;
    this.points = points;
  }

  reset() {
    this.timeLimit = this.DEFAULT_TIME_LIMIT;
    this.points = this.DEFAULT_INIT_POINTS;
  }

  fetchSong(songUuid: string) {
    if (this.songUuid == null || this.songUuid !== songUuid) {
      this.songUuid = songUuid;
      if (!this.audio.paused) {
        this.audio.pause();
      }
      this.audio = new Audio(this.getSongFileUrl());
      this.audio.volume = 0.3;
      this.audio.load();
    }
  }

  getSongFileUrl() {
    return environment.apiURL + '/api/songs/' + this.songUuid + '/file';
  }

  playPause() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  incrementTime() {
    this.timeLimit++;
    if (this.points > 0) {
      this.points--;
    }
  }

  async playWithTimeLimit() {
    this.audio.play();
    await this.delay(this.timeLimit);
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  delay(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

}
