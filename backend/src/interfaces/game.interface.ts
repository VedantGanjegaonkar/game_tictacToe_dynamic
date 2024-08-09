
import mongoose, { Schema, Document, ObjectId } from 'mongoose';


interface IGame extends Document {
    userId:  Schema.Types.ObjectId;
    boardSize: number;
    board: string[][];
    players:{
        p_name:string,
        p_color:string,
    }[],
    points:{
        p_name:string,
        blocks:number
        score:number
    }[],
    currentPlayer: string;
    status: 'ongoing' | 'finished';
    winner: string | null;
  }

export{IGame}