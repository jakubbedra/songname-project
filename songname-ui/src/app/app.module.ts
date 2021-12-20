import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AuthorListComponent} from './authors/author-list/author-list.component';
import {AuthorAddComponent} from './authors/author-add/author-add.component';
import {AuthorsService} from "./authors/authors.service";
import {HttpClientModule} from "@angular/common/http";
import { AuthorViewComponent } from './authors/author-view/author-view.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { SongListComponent } from './songs/song-list/song-list.component';
import {SongsService} from "./songs/songs.service";
import { SongAddComponent } from './songs/song-add/song-add.component';
import { SongEditComponent } from './songs/song-edit/song-edit.component';
import { GameCreateComponent } from './game/game-create/game-create.component';
import { PlayerListComponent } from './game/player-list/player-list.component';
import {GameService} from "./game/game.service";
import {PlayersService} from "./game/players.service";
import { GameConfigComponent } from './game/game-config/game-config.component';
import { DataAdminPanelComponent } from './data-administration/data-admin-panel/data-admin-panel.component';
import { LocalGameComponent } from './game/local-game/local-game.component';
import { GameResultsComponent } from './game/game-results/game-results.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthorListComponent,
    AuthorAddComponent,
    AuthorViewComponent,
    AuthorEditComponent,
    SongListComponent,
    SongAddComponent,
    SongEditComponent,
    GameCreateComponent,
    PlayerListComponent,
    GameConfigComponent,
    DataAdminPanelComponent,
    LocalGameComponent,
    GameResultsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
    AuthorsService,
    SongsService,
    GameService,
    PlayersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
