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
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const notifications_controller_1 = require("./notifications.controller");
const prisma_service_1 = require("../../prisma/prisma.service");
const app_notification_1 = require("./app.notification");
const notifications_service_1 = require("./notifications.service");
const notifications_repository_1 = require("./notifications.repository");
const notifications_factory_1 = require("./notifications.factory");
let NotificationsModule = class NotificationsModule {
    constructor(notificationService, inAppNotification) {
        this.notificationService = notificationService;
        this.inAppNotification = inAppNotification;
    }
    onModuleInit() {
        this.notificationService.subscribe(this.inAppNotification);
    }
    onModuleDestroy() {
        this.notificationService.unsubscribe(this.inAppNotification);
    }
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        providers: [
            notifications_service_1.NotificationService,
            notifications_repository_1.NotificationsRepository,
            prisma_service_1.PrismaService,
            app_notification_1.InAppNotification,
            notifications_factory_1.NotificationFactory,
        ],
        controllers: [notifications_controller_1.NotificationsController],
        exports: [notifications_service_1.NotificationService, app_notification_1.InAppNotification],
    }),
    __metadata("design:paramtypes", [notifications_service_1.NotificationService,
        app_notification_1.InAppNotification])
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map