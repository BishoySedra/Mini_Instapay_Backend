import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TransactionsModule,
    NotificationsModule,
    AdminModule,
    ReportsModule,
  ]
})
export class AppModule { }
