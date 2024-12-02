import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { LinkBankAccountDTO } from './dtos/linkBankAccount.dto';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('linkBankAccount')
  @UseGuards(JwtAuthGuard)
  async linkBankAccount(
    @Body() linkBankAccountDTO: LinkBankAccountDTO,
    @Req() req: Request,
  ) {
    const account = await this.usersService.linkBankAccount(
      linkBankAccountDTO,
      req.user,
    );
    return { message: 'Bank account linked successfully', account };
  }

  @Get('showBankAccounts')
  @UseGuards(JwtAuthGuard)
  async showBankAccounts(@Req() req: Request) {
    const accounts = await this.usersService.showBankAccounts(req.user);
    return { message: 'showing user accounts', accounts };
  }
  @Delete('deleteBankAccount')
  @UseGuards(JwtAuthGuard)
  async unlinkBankAccount(@Param('id') id: string, @Req() req: Request) {
    await this.usersService.unlinkBankAccount(id, req.user);
    return { message: 'Bank account unlinked successfully' };
  }
  @Post('updateProfile')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Req() req: Request, @Body() updateData: any) {
    const user = req.user;
    this.usersService.updateProfile(updateData, user);
  }
}
