import { Reflector } from '@nestjs/core';
import { ROLE } from './entities/user.entity';

export const Roles = Reflector.createDecorator<ROLE[]>();
