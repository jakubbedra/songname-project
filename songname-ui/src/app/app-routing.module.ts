import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorListComponent} from "./authors/author-list/author-list.component";
import {AuthorEditComponent} from "./authors/author-edit/author-edit.component";
import {AuthorViewComponent} from "./authors/author-view/author-view.component";
import {SongEditComponent} from "./songs/song-edit/song-edit.component";
import {GameCreateComponent} from "./game/game-create/game-create.component";
import {DataAdminPanelComponent} from "./data-administration/data-admin-panel/data-admin-panel.component";
import {LocalGameComponent} from "./game/local-game/local-game.component";
import {GameResultsComponent} from "./game/game-results/game-results.component";

const routes: Routes = [
  {path: '', component: AuthorListComponent},
  {path: 'authors', component: AuthorListComponent},
  {path: 'authors/edit/:uuid', component: AuthorEditComponent},
  {path: 'authors/:uuid', component: AuthorViewComponent},
  {path: 'songs/:uuid/edit', component: SongEditComponent},
  {path: 'game/local/create', component: GameCreateComponent},
  {path: 'game/local/:uuid', component: LocalGameComponent},
  {path: 'game/local/:uuid/results', component: GameResultsComponent},
  {path: 'admin', component: DataAdminPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
