import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../iam.constants';
import { ActiveUserData } from '../interfaces/active-user';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    // eslint-disable-next-line
    const user: ActiveUserData | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
