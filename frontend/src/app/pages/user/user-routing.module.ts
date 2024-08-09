import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameBoardComponent } from './game-board/game-board.component';

const routes: Routes = [{ path: '', redirectTo: '/create-game', pathMatch: 'full' },
  { path: 'create-game', component: CreateGameComponent },
  { path: 'game-board/:id', component: GameBoardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
