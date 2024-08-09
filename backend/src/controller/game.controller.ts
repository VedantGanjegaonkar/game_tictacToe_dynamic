import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { TYPES } from '../TYPES';
import { GameService } from '../sevices/game.service';
import { UserService } from '../sevices/user.service';
import { errorHandler } from '../middleware/errorHandler';
import { IGame } from '../interfaces';
import { adminOnly } from '../middleware/auth.middleware';
import { moduleType } from '../utils/moduleSetter';
import { PermissionMiddleware } from '../middleware/permission.middleware';

@controller('/game',moduleType('game'))
export class GameController {
  
  constructor(@inject(TYPES.GameService) private readonly gameService:GameService,
            @inject(TYPES.UserService) private readonly userService:UserService){}

  @httpPost('/',TYPES.PermissionMiddleware) 
  public async createGame(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const header=req.headers.authorization as string
        const userId = await this.userService.getUserId(header);
      const { boardSize, players } = req.body;
      const newGame = await this.gameService.createGame(userId, boardSize, players);
      res.status(201).json(newGame);
    } catch (err:any) {
      errorHandler(err,req,res,next);
    }
  }

@httpGet('/:id')
  public async getGame(req: Request, res: Response, next: NextFunction):Promise<void>{
    try {
      const gameId = req.params.id;
      const game = await this.gameService.getGameById(gameId);
      res.status(201).json(game);

    } catch (error:any) {
      errorHandler(error,req,res,next);
    }
  }

  @httpPost('/:id/move')
  public async makeMove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {id}=req.params
      const { row, col } = req.body;
      const updatedGame = await this.gameService.makeMove(id, row, col);
      res.status(200).json(updatedGame);
    } catch (err:any) {
        errorHandler(err,req,res,next);
    }
  }
}
