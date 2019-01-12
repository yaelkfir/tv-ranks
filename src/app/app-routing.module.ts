import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RankListComponent} from './rank-list/rank-list.component';
import {FavoriteListComponent} from './favorite-list/favorite-list.component';

const routes: Routes = [
  {path: '', component: RankListComponent},
  {path: 'favorites', component: FavoriteListComponent},
  {path: '**',     redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
