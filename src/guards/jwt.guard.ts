import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;
    if (!bearerToken) {
      throw new UnauthorizedException('No authorization header');
    }

    try {
      const jwt = bearerToken.replace('Bearer ', '');
      this.jwtService.verify(jwt);
      return true;
    } catch (e) {
      throw new UnauthorizedException('invalid jwt token');
    }
  }
}
