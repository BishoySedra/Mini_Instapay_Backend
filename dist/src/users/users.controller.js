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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const linkBankAccount_dto_1 = require("./dtos/linkBankAccount.dto");
const updateUserProfile_dto_1 = require("./dtos/updateUserProfile.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async linkBankAccount(linkBankAccountDTO, req) {
        const account = await this.usersService.linkBankAccount(linkBankAccountDTO, req.user);
        return { message: 'Bank account linked successfully', account };
    }
    async unlinkBankAccount(bankAccountNumber, req) {
        await this.usersService.unlinkBankAccount(bankAccountNumber, req.user);
        return { message: 'Bank account unlinked successfully' };
    }
    async showBankAccounts(req) {
        const accounts = await this.usersService.showBankAccounts(req.user);
        return { message: 'Showing user bank accounts', accounts };
    }
    async updateProfile(req, updateData) {
        const updatedUser = await this.usersService.updateProfile(updateData, req.user);
        return { message: 'Profile updated successfully', updatedUser };
    }
    async getProfile(req) {
        const user = await this.usersService.getProfile(req.user);
        return { message: 'user profile returned succesfully', user };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('linkBankAccount'),
    (0, swagger_1.ApiOperation)({ summary: 'Link a bank account to the user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Bank account linked successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bank account already linked or invalid data' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [linkBankAccount_dto_1.LinkBankAccountDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "linkBankAccount", null);
__decorate([
    (0, common_1.Delete)('unlinkBankAccount/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Unlink a bank account from the user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bank account unlinked successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Account not found or not linked to this user' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "unlinkBankAccount", null);
__decorate([
    (0, common_1.Get)('showBankAccounts'),
    (0, swagger_1.ApiOperation)({ summary: 'Show all bank accounts linked to the user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of bank accounts returned successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'No bank accounts linked to the user' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "showBankAccounts", null);
__decorate([
    (0, common_1.Patch)('updateProfile'),
    (0, swagger_1.ApiOperation)({ summary: 'Update the user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'No valid fields to update or invalid data' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateUserProfile_dto_1.UpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User profile returned successfully' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map