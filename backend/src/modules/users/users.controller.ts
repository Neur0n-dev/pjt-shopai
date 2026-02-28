import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

// TODO: GET /users/me, PATCH /users/me, PATCH /users/me/password
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
