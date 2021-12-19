import {Component, OnInit} from '@angular/core';
import {SongsService} from "../songs.service";
import {Song} from "../song.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css']
})
export class SongEditComponent implements OnInit {

  song: Song;
  songFile: File;

  constructor(
    private route: ActivatedRoute,
    private songsService: SongsService
  ) {
  }

  ngOnInit(): void {
    this.songsService.fetchSong(this.route.snapshot.params['uuid']).subscribe(response => {
      this.song = response;
    });
  }

  onDataSave(title: string) {
    this.songsService.updateSong(this.song.uuid, title, this.song.author).subscribe(response => {
    });
  }

  onFileSave() {
    this.songsService.updateSongFile(this.song.uuid, this.songFile).subscribe(response => {
    });
  }

  onSelectFile(event) {
    this.songFile = event.target.files[0];
  }

}
