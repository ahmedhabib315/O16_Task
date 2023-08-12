import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@app/lib/strategy/jwt.strategy';
import { CONSTANTS } from 'src/constants';

@Module({
  imports: [PrismaModule, JwtModule.register(CONSTANTS.jwtRegisterOptions)],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
