import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface JwtPayload {
  sub: string;
  roleId: string;
  iat?: number;
  exp?: number;
}

/**
 * Extracts the decoded JWT payload from the request.
 * Use inside controllers protected by JwtAuthGuard.
 *
 * @example
 * getProfile(@CurrentUser() user: JwtPayload) { ... }
 * getProfile(@CurrentUser('sub') userId: string) { ... }
 */
export const CurrentUser = createParamDecorator(
  (field: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();
    const user = request.user;
    return field ? user?.[field] : user;
  },
);
