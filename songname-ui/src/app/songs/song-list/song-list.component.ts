import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SongsService} from "../songs.service";
import {Song} from "../song.model";
import {SongPlayer} from "../song-player";

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  authorUuid: string;
  songs: Song[];
  songPlayer: SongPlayer;

  constructor(
    private route: ActivatedRoute,
    private songsService: SongsService
  ) {
  }

  ngOnInit(): void {
    this.songPlayer = new SongPlayer(0, 0);
    this.authorUuid = this.route.snapshot.params['uuid'];
    this.fetchSongs();
  }

  fetchSongs() {
    this.songsService.fetchAuthorSongs(this.authorUuid).subscribe(response => {
      this.songs = response;
    });
  }

  onPlaySong(uuid: string) {
    this.songPlayer.fetchSong(uuid);
    this.songPlayer.playPause();
  }

  onDeleteSong(uuid: string) {
    console.log(uuid);
    this.songsService.deleteSong(uuid).subscribe(response => {
      this.fetchSongs();
    });
  }

}
