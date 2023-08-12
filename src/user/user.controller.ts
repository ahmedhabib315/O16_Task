import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignin, UserSignup } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetTokenData } from '@app/lib/decorators/user.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 
   * Method to Login a User
   * 
   * @param data 
   * @returns 
   */
  @Post('signin')
  @ApiOperation({ summary: 'Signin user' })
  @ApiBody({ description: 'Data to signin user', type: UserSignin })
  async signin(@Body() data: UserSignin){
    return await this.userService.signin(data);
  }

  /**
   * 
   * Method to Sign up a New User
   * 
   * @param data 
   * @returns 
   */
  @Post('signup')
  @ApiOperation({ summary: 'signup user' })
  @ApiBody({ description: 'Data to signup user', type: UserSignup })
  async signup(@Body() data: UserSignup){
    return await this.userService.signup(data);
  }
}
