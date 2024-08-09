import mongoose, { Schema } from 'mongoose';
import { IGame } from '../interfaces';


const PlayerSchema = new Schema({
    p_name: { type: String, required: true, unique: true },
    p_color: { type: String, required: true },
  });
  
  const PointsSchema = new Schema({
    p_name: { type: String, required: true },
    blocks: { type: Number, required: true },
    score: { type: Number, required: true },
  });
  
  const gameSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    boardSize: { type: Number, required: true },
    board: { type: [[String]], required: true },
    players: { type: [PlayerSchema], required: true },
    points: { type: [PointsSchema], required: true },
    currentPlayer: { type: String, required: true },
    status: { type: String, required: true, enum: ['ongoing', 'finished'], default: 'ongoing' },
    winner: { type: String, default: null },
  });
  
  
  // Add a unique index to p_name in the players array
  gameSchema.index({ 'players.p_name': 1 }, { unique: true });
  
  // Add a unique index to p_name in the points array
  gameSchema.index({ 'points.p_name': 1 }, { unique: true });
  
  const Game = mongoose.model<IGame>('Game', gameSchema);

  export {Game}