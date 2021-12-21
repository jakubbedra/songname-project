import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SongsService} from "../songs.service";
import {Song} from "../song.model";
import {ActivatedRoute} from "@angular/router";
import {Author} from "../../authors/author.model";
import {AuthorsService} from "../../authors/authors.service";

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css']
})
export class SongEditComponent implements OnInit {

  @ViewChild('author') authorSelect: ElementRef;
  @ViewChild('title') titleInput: ElementRef;

  selectedAuthorUuids: string[];
  authors: Author[];
  song: Song;
  songFile: File;

  constructor(
    private route: ActivatedRoute,
    private songsService: SongsService,
    private authorsService: AuthorsService
  ) {
    this.selectedAuthorUuids = [];
  }

  ngOnInit(): void {
    this.songsService.fetchSong(this.route.snapshot.params['uuid']).subscribe(response => {
      this.song = response;
      this.titleInput.nativeElement.value = this.song.title;
    });
    this.authorsService.fetchAuthors().subscribe(response => {
      this.authors = response;
    });
  }

  onAuthorAdd(uuid: string) {
    this.selectedAuthorUuids.push(uuid);
    this.authorSelect.nativeElement.value = "";
  }

  onDataSave(title: string) {
    this.songsService.updateSong(this.song.uuid, title, this.selectedAuthorUuids).subscribe(response => {
    });
  }

  onFileSave() {
    this.songsService.updateSongFile(this.song.uuid, this.songFile).subscribe(response => {
    });
  }

  onSelectFile(event) {
    this.songFile = event.target.files[0];
  }

  authorName(uuid: string): string {
    for (let author of this.authors) {
      if (author.uuid === uuid) {
        return author.name;
      }
    }
    return "";
  }

}
