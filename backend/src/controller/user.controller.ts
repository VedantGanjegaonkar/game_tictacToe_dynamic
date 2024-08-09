import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { TYPES } from '../TYPES';
import { UserService } from '../sevices/user.service';
import { errorHandler } from '../middleware/errorHandler';
import { moduleType } from '../utils/moduleSetter';

@controller('/users',moduleType('user'))
export class UserController {
   
    constructor(@inject(TYPES.UserService) private readonly userService: UserService) {}

    @httpPost('/login')
    public async login(req: Request, res: Response, next:NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            const user = await this.userService.findUserByEmail(email);
          
            await this.userService.validatePassword(password, user.password);

            const token = this.userService.generateAuthToken(user._id.toString(), user.role);
            
            res.status(200).json({ message: 'Login successful', token });
        } catch (err: any) {
            errorHandler(err,req,res,next)
        }
    }
    
    @httpPost('/signup')
    public async signup(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const { username, email, password, role } = req.body;

            // Create the user object
            const createUserParams = { username, email, password, role };

            // Call the service to create a user
            const newUser = await this.userService.createUser(createUserParams);
            

            res.status(201).json({ message: 'User created successfully', user: newUser});
        } catch (err: any) {
            errorHandler(err,req,res,next)
        }
    }


}