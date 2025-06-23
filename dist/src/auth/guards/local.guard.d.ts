import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
declare const LocalGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalGuard extends LocalGuard_base {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
export {};
