import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ROLE } from '@src/users/types/user';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtAuthGuard } from './jwt.guard';
import { JwtPayload } from '@src/auth/interface/jwt-payload.interface';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    // Primero verifica si la ruta tiene roles definidos
    const requiredRoles = this.reflector.getAllAndOverride<USER_ROLE[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Si no hay roles en la ruta, se permite el acceso
    if (!requiredRoles) return true;

    // Verifica el JWT (gracias a la extensión de JwtAuthGuard)
    const canActivateJwt = super.canActivate(context);

    // Si el JWT no es válido, deniega el acceso
    if (!canActivateJwt) return false;

    // Si el JWT es válido, verifica los roles
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload;

    // Verifica si el usuario tiene alguno de los roles requeridos
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
