import { AuthService } from './auth.service';
import { Request } from 'express';
import { RegisterPayloadDTO } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: Request): {
        message: string;
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            isAdmin: boolean;
            phone: string;
            address: string;
        };
    };
    signup(registerPayloadDto: RegisterPayloadDTO): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
}
