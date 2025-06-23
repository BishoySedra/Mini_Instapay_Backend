"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const local_guard_1 = require("./guards/local.guard");
const register_dto_1 = require("./dto/register.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req) {
        const user = req.user;
        const token = this.authService.generateJwt(user);
        return { message: 'login successful', token, user };
    }
    async signup(registerPayloadDto) {
        const user = await this.authService.createUser(registerPayloadDto);
        return {
            message: 'Signup successful',
            user: { id: user.id, email: user.email, name: user.name },
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(local_guard_1.LocalGuard),
    (0, swagger_1.ApiOperation)({ summary: 'User login', description: 'Authenticate a user and return a JWT token.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login successful. Returns the user details and JWT token.',
        schema: {
            example: {
                message: 'login successful',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                user: {
                    id: '123',
                    email: 'user@example.com',
                    name: 'John Doe',
                    isAdmin: false,
                    phone: '1234567890',
                    address: '123 Main St',
                },
            },
        },
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({ summary: 'User signup', description: 'Register a new user and return their details.' }),
    (0, swagger_1.ApiBody)({
        description: 'Payload for user registration',
        schema: {
            example: {
                email: 'user@example.com',
                password: 'securepassword',
                name: 'John Doe',
                phone: '1234567890',
                address: '123 Main St',
            },
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Signup successful. Returns the newly created user details.',
        schema: {
            example: {
                message: 'Signup successful',
                user: {
                    id: '123',
                    email: 'user@example.com',
                    name: 'John Doe',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterPayloadDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map