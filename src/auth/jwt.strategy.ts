import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

export interface JwtPayload {
  email: string;
  sub: number;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_JWT,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { email } = payload;
    const user: User = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { ...user, role: payload.role };
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      return true;
    }
    return super.canActivate(context);
  }
}
