// src/auth/roles.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from 'src/auth/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { requestWithUser } from 'src/types/userRequest.type';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<ROLE[]>(Roles, context.getHandler());
    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<requestWithUser>();
    const user = request.user;
    console.log({ user });

    return roles.includes(user.role);
  }
}
