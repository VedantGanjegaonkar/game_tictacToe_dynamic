import { Document, Schema } from 'mongoose';

interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: string;
    
}

export {IUser}