import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SongsService} from "../songs.service";
import {AuthorsService} from "../../authors/authors.service";
import {Author} from "../../authors/author.model";

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css']
})
export class SongAddComponent implements OnInit {

  @ViewChild('author') authorSelect: ElementRef;

  @Output() updateSongsListEvent = new EventEmitter<void>();

  selectedAuthorUuids: string[];
  authors: Author[];
  authorUuid: string;
  songFile: File;

  constructor(
    private route: ActivatedRoute,
    private songsService: SongsService,
    private authorsService: AuthorsService
  ) {
    this.selectedAuthorUuids = [];
  }

  ngOnInit(): void {
    this.authorUuid = this.route.snapshot.params['uuid'];
    this.selectedAuthorUuids.push(this.authorUuid);
    this.authorsService.fetchAuthors().subscribe(response => {
      this.authors = response;
      console.log(this.selectedAuthorUuids);
    });
  }

  onSelectFile(event) {
    this.songFile = event.target.files[0];
  }

  onCreateSong(title: string) {
    this.songsService.addSong(title, this.selectedAuthorUuids, this.songFile).subscribe(response => {
      if (response.status === 201) {
        this.updateSongsListEvent.emit();
      }
    });
  }

  onAuthorAdd(uuid: string) {
    console.log(uuid);
    this.selectedAuthorUuids.push(uuid);
    this.authorSelect.nativeElement.value = "";
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
