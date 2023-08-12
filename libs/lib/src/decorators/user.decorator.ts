import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetTokenData = createParamDecorator(
  (data: string | undefined,context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    
    return request.user;
  },
)

export const IfAdmin = createParamDecorator(
  (data: string | undefined,context: ExecutionContext): boolean => {
    const request = context.switchToHttp().getRequest();
    if(request.user && request.user.role && request.user.role == 'admin'){
      return true;
    } else {
      return false;
    }
  },
)