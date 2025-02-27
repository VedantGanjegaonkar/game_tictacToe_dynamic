import { BaseMiddleware } from 'inversify-express-utils'
import { NextFunction, Response } from 'express'
import { permission } from 'process'
import { inject } from 'inversify'
import { TYPES } from '../TYPES'
import { PermissionService } from '../sevices/permission.service'

interface Permission {
  read: boolean
  write: boolean
  update: boolean
  delete: boolean
  roleName: string
}

interface User {
  permissions: Permission[]
}

export class PermissionMiddleware extends BaseMiddleware {
  constructor(
    @inject(TYPES.PermissionService)
    private readonly _permissionService: PermissionService
  ) {
    super()
  }
  async handler(req: any, res: Response, next: NextFunction) {
    const moduleName = req.headers.module as string
    const role: string = req.user.role
    // console.log(moduleName)
    // console.log(role)
    const permissions: Permission[] =
      await this._permissionService.getPermissions(moduleName, role)
    const permission = permissions[0]
    req.permission = permission

    // console.log(permission);

    // permit(permission);

    next()
  }
}
