import mongoose from 'mongoose';
import { IGame } from '../interfaces';                                                  
import { Game } from '../model';
import { injectable } from 'inversify';
import { NotFoundError } from '../utils/errors';

@injectable()
export class GameService {
    public async createGame(userId: string, boardSize: number, players: { p_name: string; p_color: string }[]): Promise<IGame> {
        if (!Array.isArray(players) || players.length < 2) {
          throw new Error('At least two players are required');
        }
    
        const initialBoard: string[][] = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    
        const newGame: IGame = new Game({
          userId: new mongoose.Types.ObjectId(userId),
          boardSize: boardSize,
          board: initialBoard,
          players: players.map(player => ({
            p_name: player.p_name,
            p_color: player.p_color
          })),
          points: players.map(player => ({
            p_name: player.p_name,
            blocks: 0,
            score: 0
          })),
          currentPlayer: players[0].p_name, // The first player starts
          status: 'ongoing',
          winner: null
        });
    
        return await newGame.save();
      }


//part 2 make move


public async makeMove(gameId: string, row: number, col: number): Promise<IGame> {
  const game = await Game.findById(gameId);

  if (!game) {
    throw new Error('Game not found');
  }

  if (game.status !== 'ongoing') {
    throw new Error('Game has already finished');
  }

  if (game.board[row][col] !== null) {
    throw new Error('Cell is already occupied');
  }

  const currentPlayer = game.currentPlayer;

  game.board[row][col] = currentPlayer;
  if (this.checkWinner(game, row, col)) {
    
    this.updateScore(game, currentPlayer);
  }  

  game.currentPlayer = this.getNextPlayer(game);
  await game.save();
  return game;
}

private checkWinner(game: IGame, row: number, col: number): boolean {
  
  
  const board = game.board;
  const boardSize = game.boardSize;
  const currentPlayer = game.currentPlayer;

  const checkLine = (line: string[]) => line.every(cell => cell === currentPlayer);


  // Check row
  if (checkLine(board[row])) {
    return true;
  }

  // Check column
  if (checkLine(board.map(r => r[col]))) {
    return true;
  }

  // Check main diagonal
  if (row === col && checkLine(board.map((r, i) => r[i]))) {
    return true;
  }

  // Check anti-diagonal
  if (row + col === boardSize - 1 && checkLine(board.map((r, i) => r[boardSize - 1 - i]))) {
    return true;
  }

  return false;
}

private getNextPlayer(game: IGame): string {
  const currentIndex = game.players.findIndex(player => player.p_name === game.currentPlayer);
  const nextIndex = (currentIndex + 1) % game.players.length;
  return game.players[nextIndex].p_name;
}

private updateScore(game: IGame, playerName: string): void {
  const playerPoints = game.points.find(p => p.p_name === playerName);
  if (playerPoints) {
    playerPoints.score += 1;
  }
}

public async getGameById(id:string): Promise<IGame>  {

  const game=await Game.findById(id)
  if(!game){
    throw new NotFoundError('Game not found')
  }
  return game;

}
}
