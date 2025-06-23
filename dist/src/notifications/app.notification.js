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
exports.InAppNotification = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const notifications_factory_1 = require("./notifications.factory");
const notifications_type_1 = require("./notifications.type");
let InAppNotification = class InAppNotification {
    constructor(prisma, notificationFactory) {
        this.prisma = prisma;
        this.notificationFactory = notificationFactory;
    }
    async update(event, data) {
        try {
            if (event === 'transaction') {
                const { type, sender, receiver, amount } = data;
                if (type === 'sent') {
                    await this.notificationFactory.createNotification(notifications_type_1.NotificationType.IN_APP, {
                        userId: sender.id,
                        message: `You have successfully sent $${amount} to ${receiver.name}.`,
                    });
                }
                else if (type === 'received') {
                    await this.notificationFactory.createNotification(notifications_type_1.NotificationType.IN_APP, {
                        userId: receiver.id,
                        message: `You have received $${amount} from ${sender.name}.`,
                    });
                }
            }
        }
        catch (error) {
        }
    }
};
exports.InAppNotification = InAppNotification;
exports.InAppNotification = InAppNotification = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_factory_1.NotificationFactory])
], InAppNotification);
//# sourceMappingURL=app.notification.js.map