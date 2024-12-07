import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { PrismaService } from 'prisma/prisma.service';
import { ReportsRepository } from './reports.repository';
import { ReportFactory } from './reports.factory';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, PrismaService, ReportsRepository, ReportFactory],
})
export class ReportsModule {}
