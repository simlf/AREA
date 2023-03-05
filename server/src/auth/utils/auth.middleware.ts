import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MyAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (token) {
      return super.canActivate(context);
    } else {
      return false;
    }
  }
}



@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Here !")
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/login'); // Rediriger vers la page de login si l'utilisateur n'est pas connecté
    }
  }
}

export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}
  
    async use(req: any, res: any, next: () => void) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7, authHeader.length);
        try {
          const payload = await this.jwtService.verifyAsync(token);
          req.user = payload;
        } catch (error) {
          // Token invalide
        }
      }
      next();
    }
  }