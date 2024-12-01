import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('createBankAccount')
  // createTransaction(@Body() createBankAccountDTO: CreateBankAccountDTO) {
  //   this.usersService.createBankAccount();
  // }
  @Get('updateProfile')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Req() req: Request, @Body() updateData: any) {
    const user = req.user;

    this.usersService.updateProfile(updateData, user);
  }
}
