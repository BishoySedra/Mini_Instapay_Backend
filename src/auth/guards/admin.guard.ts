import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const user = request.user;

    // Check if the user is logged in and isAdmin is true
    if (user && user.isAdmin) {
      return true;
    }

    // If not, throw a forbidden exception
    throw new ForbiddenException('You do not have admin privileges.');
  }
}
