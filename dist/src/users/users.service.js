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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const users_factory_1 = require("./users.factory");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(usersRepository, usersFactory, jwtService) {
        this.usersRepository = usersRepository;
        this.usersFactory = usersFactory;
        this.jwtService = jwtService;
    }
    async linkBankAccount(bankAccountData, user) {
        const { accountNumber, bankName, balance } = bankAccountData;
        const existingAccount = await this.usersRepository.findByAccountNumber(accountNumber);
        if (existingAccount) {
            throw new common_1.BadRequestException('This bank account is already linked.');
        }
        const account = await this.usersRepository.createBankAccount({
            accountNumber,
            bankName,
            balance,
            userId: user.id,
        });
        return this.usersFactory.createBankAccountResponse(account);
    }
    async unlinkBankAccount(bankAccountNumber, user) {
        const account = await this.usersRepository.findByAccountNumber(bankAccountNumber);
        if (!account || account.userId !== user.id) {
            throw new common_1.BadRequestException('Account not found or not linked to this user.');
        }
        await this.usersRepository.deleteByAccountNumber(bankAccountNumber);
    }
    async showBankAccounts(user) {
        const accounts = await this.usersRepository.findAllByUserId(user.id);
        if (!accounts || accounts.length === 0) {
            throw new common_1.BadRequestException('No bank accounts linked to the user.');
        }
        return this.usersFactory.createBankAccountsResponse(accounts);
    }
    async updateProfile(updateData, user) {
        const allowedFields = ['dailyLimit', 'phone', 'address'];
        const updateFields = Object.fromEntries(Object.entries(updateData).filter(([key, value]) => allowedFields.includes(key) && value !== undefined));
        console.log(updateFields);
        if (Object.keys(updateFields).length === 0) {
            throw new common_1.BadRequestException('No valid fields to update.');
        }
        const updatedUser = await this.usersRepository.updateProfile(user.email, updateFields);
        return this.usersFactory.createUserProfileResponse(updatedUser);
    }
    async getProfile(user) {
        return this.usersRepository.findById(user.id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        users_factory_1.UserFactory,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map