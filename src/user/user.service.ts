import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserSignin, UserSignup } from './dto/user.dto';
import { PrismaService } from '@app/lib/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CONSTANTS } from 'src/constants';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  /**
   * 
   * Create a new User with confirmation of already not present in Db
   * 
   * @param data 
   * @returns 
   */
  async signup(data: UserSignup){
    const isExist = await this.prisma.users.findUnique({
      where: {
        email: data.email
      }
    });

    if(isExist){
      throw new UnauthorizedException(CONSTANTS.exceptionMessages.emailExists)
    }
  
    return await this.prisma.users.create({data});
  }


  /**
   * 
   * Sign In to a Present User
   * 
   * @param data 
   * @returns 
   */
  async signin(data: UserSignin){
    const user = await this.prisma.users.findUnique({
      where:{
        email: data.email
      },
    });
    if(user){
      if(user.password == data.password){
        const token = await this.generateToken({email: user.email, role: user.role});
        delete user.password;
        
        return {...user, access_token: token};
      }
      throw new UnauthorizedException(CONSTANTS.exceptionMessages.credentialsError);
    }
    throw new UnauthorizedException(CONSTANTS.exceptionMessages.credentialsError);
  }

  /**
   * 
   * Generate Token for a Signing In User
   * 
   * @param data 
   * @returns 
   */
  async generateToken(data: any){
    return this.jwtService.sign(data);
  }
}
