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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const helpers_1 = require("./utils/helpers");
const auth_repository_1 = require("./auth.repository");
let AuthService = class AuthService {
    constructor(jwtService, authRepository) {
        this.jwtService = jwtService;
        this.authRepository = authRepository;
    }
    async createUser(data) {
        const { email, password, name, phone, address } = data;
        const isFound = await this.authRepository.findUserByEmail(email);
        if (isFound) {
            throw new common_1.UnauthorizedException('this email is already taken');
        }
        return await this.authRepository.createUser({
            email,
            password,
            name,
            phone,
            address,
        });
    }
    async validateUser({ email, password }) {
        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await (0, helpers_1.verifyPassword)(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    generateJwt(user) {
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            phone: user.phone,
            address: user.address,
        };
        return this.jwtService.sign(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        auth_repository_1.AuthRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map