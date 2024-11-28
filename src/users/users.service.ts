import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
  address: string;
  //    linkedAccounts: string;
}
