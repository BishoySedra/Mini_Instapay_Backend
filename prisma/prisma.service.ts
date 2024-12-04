import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    this.$use(async (params: Prisma.MiddlewareParams, next) => {
      if (
        params.model === 'User' &&
        (params.action === 'create' || params.action === 'update')
      ) {
        const data = params.args.data;
        if (data.password) {
          data.password = await bcrypt.hash(
            data.password,
            parseInt(process.env.SALT_ROUNDS, 10),
          );
        }
      }
      return next(params);
    });

    await this.$connect();
  }
}
