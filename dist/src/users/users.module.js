"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const jwt_strategy_1 = require("../auth/strategies/jwt.strategy");
const prisma_service_1 = require("../../prisma/prisma.service");
const users_repository_1 = require("./users.repository");
const users_factory_1 = require("./users.factory");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.SECRET_KEY,
                signOptions: { expiresIn: '1d' },
            }),
        ],
        providers: [
            users_service_1.UsersService,
            jwt_strategy_1.JwtStrategy,
            prisma_service_1.PrismaService,
            users_repository_1.UsersRepository,
            users_factory_1.UserFactory,
        ],
        controllers: [users_controller_1.UsersController]
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map