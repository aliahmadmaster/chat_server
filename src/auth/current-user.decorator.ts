import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';

export const getCurrentUserByContext = (context: ExecutionContext): User => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
