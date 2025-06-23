"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionFactory = void 0;
const common_1 = require("@nestjs/common");
let TransactionFactory = class TransactionFactory {
    createTransaction(senderId, receiverId, senderBankAccountId, receiverBankAccountId, amount, type, status) {
        return {
            sender: { connect: { id: senderId } },
            receiver: { connect: { id: receiverId } },
            senderBankAccount: { connect: { id: senderBankAccountId } },
            receiverBankAccount: { connect: { id: receiverBankAccountId } },
            amount,
            type,
            status,
        };
    }
};
exports.TransactionFactory = TransactionFactory;
exports.TransactionFactory = TransactionFactory = __decorate([
    (0, common_1.Injectable)()
], TransactionFactory);
//# sourceMappingURL=transactions.factory.js.map