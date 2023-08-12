import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { JwtStrategy } from '@app/lib/strategy/jwt.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
