import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, UsersModule, TransactionsModule, NotificationsModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
