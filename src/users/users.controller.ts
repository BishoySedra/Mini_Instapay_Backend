// users.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { LinkBankAccountDTO } from './dtos/linkBankAccount.dto';
import { UpdateUserProfileDto } from './dtos/updateUserProfile.dto';

@ApiTags('Users') // Group the endpoints under the "Users" tag
@ApiBearerAuth() // Indicate that these endpoints require a Bearer token
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('linkBankAccount')
  @ApiOperation({ summary: 'Link a bank account to the user' })
  @ApiResponse({ status: 201, description: 'Bank account linked successfully' })
  @ApiResponse({ status: 400, description: 'Bank account already linked or invalid data' })
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

  @Delete('unlinkBankAccount/:id')
  @ApiOperation({ summary: 'Unlink a bank account from the user' })
  @ApiResponse({ status: 200, description: 'Bank account unlinked successfully' })
  @ApiResponse({ status: 400, description: 'Account not found or not linked to this user' })
  async unlinkBankAccount(
    @Param('id') bankAccountNumber: string,
    @Req() req: Request,
  ) {
    await this.usersService.unlinkBankAccount(bankAccountNumber, req.user);
    return { message: 'Bank account unlinked successfully' };
  }

  @Get('showBankAccounts')
  @ApiOperation({ summary: 'Show all bank accounts linked to the user' })
  @ApiResponse({ status: 200, description: 'List of bank accounts returned successfully' })
  @ApiResponse({ status: 400, description: 'No bank accounts linked to the user' })
  async showBankAccounts(@Req() req: Request) {
    const accounts = await this.usersService.showBankAccounts(req.user);
    return { message: 'Showing user bank accounts', accounts };
  }

  @Patch('updateProfile')
  @ApiOperation({ summary: 'Update the user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 400, description: 'No valid fields to update or invalid data' })
  async updateProfile(
    @Req() req: Request,
    @Body() updateData: UpdateUserProfileDto,
  ) {
    const updatedUser = await this.usersService.updateProfile(
      updateData,
      req.user,
    );
    return { message: 'Profile updated successfully', updatedUser };
  }

  @Get('status')
  @ApiOperation({ summary: 'Get the user profile' })
  @ApiResponse({ status: 200, description: 'User profile returned successfully' })
  async getProfile(@Req() req: Request) {
    const user = await this.usersService.getProfile(req.user);
    return { message: 'user profile returned succesfully', user };
  }
}
