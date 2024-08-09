import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameBoardComponent } from './game-board/game-board.component';


@NgModule({
  declarations: [
    UserComponent,
    CreateGameComponent,
    GameBoardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
