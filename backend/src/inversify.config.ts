import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './TYPES';
import { UserService } from './sevices/user.service';
import { UserController } from './controller/user.controller';

import { GameController } from './controller/game.controller';
import { GameService } from './sevices/game.service';

import { PermissionService } from './sevices/permission.service';
import { SuperAdminServices } from './sevices/superAdmin';
import { SuperAdminController } from './controller/superAdmin.controller';

const container = new Container();

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(UserController).to(UserController);

container.bind<GameService>(TYPES.GameService).to(GameService);
container.bind<GameController>(GameController).to(GameController);

container.bind<PermissionService>(TYPES.PermissionService).to(PermissionService)
container.bind<SuperAdminServices>(TYPES.SuperAdminServices).to(SuperAdminServices)
container.bind<SuperAdminController>(SuperAdminController).to(SuperAdminController);

export { container };
