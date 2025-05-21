import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;
  
    if (token) {
      // gắn vào request để truyền qua context
      req.accessToken = token;
    }
  
    return super.canActivate(context);
  }
  

  handleRequest(err, user, info, context) {
    const req = context.switchToHttp().getRequest();
  
    if (err || !user) {
      throw err || new Error('Unauthorized');
    }
  
    if (req.accessToken) {
      user.accessToken = req.accessToken;
    }
  
    return user;
  }
  
}
