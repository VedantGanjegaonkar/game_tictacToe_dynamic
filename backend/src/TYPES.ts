
export const TYPES = {
    UserService: Symbol.for("UserService"),
    GameService:Symbol.for('GameService'),
    PermissionService: Symbol.for('PermissionService'),
    SuperAdminServices:Symbol.for("SuperAdminServices"),

     // Middlewares
     AuthMiddleware: Symbol.for('AuthMiddleware'),
     CachingMiddleware: Symbol.for('CachingMiddleware'),
     PermissionMiddleware: Symbol.for('PermissionMiddleware'),
     IsSuperAdminMiddleware: Symbol.for('IsSuperAdminMiddleware')
};
