import {
    controller,
    httpGet,
    httpPost,
    request,
    response,
    next
  } from 'inversify-express-utils'
  import { NextFunction, Request, Response } from 'express'
import { TYPES } from '../TYPES'
import { inject } from 'inversify'
import { ApiHandler } from '../utils/apiHandler'
import { PermissionService } from '../sevices/permission.service'
import { SuperAdminServices } from '../sevices/superAdmin'
import { errorHandler } from '../middleware/errorHandler'
  
  @controller('/superadmin',)
  export class SuperAdminController {
    constructor(
      @inject(TYPES.SuperAdminServices) private readonly superAdminservice: SuperAdminServices,
      @inject(TYPES.PermissionService)
      private readonly permissionService: PermissionService
    ) {}
    @httpPost('/roles')
    async assignRole(
      @request() req: Request,
      @response() res: Response,
      @next() next: NextFunction
    ) {
      try {
        const role = req.body.role
        //console.log(role)
        const roles = await this.superAdminservice.assignRoles(role)
        res.send(new ApiHandler(roles))
      } catch (err:any) {
       errorHandler(err,req,res,next)
       
      }
    }
  
    @httpPost('/model')
    async addModel(
      @request() req: Request,
      @response() res: Response,
      @next() next: NextFunction
    ) {
      try {
        const name = req.body.name
        const moduleName = await this.superAdminservice.addModel(name)
        res.send(new ApiHandler(moduleName))
      } catch (err) {
        console.log(err);
      }
    }
  
    @httpPost('/permission')
    async addPermissions(
      @request() req: Request,
      @response() res: Response,
      @next() next: NextFunction
    ) {
      try {
        const { name, role, read, write, update, delete: del } = req.body // Note the alias `delete` to `del`
        const sanitizedBody = {
          name,
          role,
          read,
          write,
          update,
          delete: del
        }
        const permissionName =
          await this.permissionService.addPermissions(sanitizedBody)
        res.send(new ApiHandler(permissionName))
      } catch (err) {
        console.log(err);
      }
    }
  }
  