import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreate, PostDelete, PostUpdate } from './dto/post.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetTokenData, IfAdmin } from '@app/lib/decorators/user.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('post')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   *
   * This method is called to create the post only with admin access
   *
   * @param user
   * @param data
   * @returns
   */
  @Post('create')
  @ApiOperation({ summary: 'create post' })
  @ApiBody({ description: 'Data to create post', type: PostCreate })
  @UseGuards(AuthGuard('jwt'))
  async create(@GetTokenData() user: any, @Body() data: PostCreate) {
    return await this.postService.create(user, data);
  }

  /**
   *
   * This method is called to delete the post only with admin access
   *
   * @param access
   * @param data
   * @returns
   */
  @Delete('delete')
  @ApiOperation({ summary: 'delete post' })
  @ApiBody({ description: 'Data to delete post', type: PostDelete })
  @UseGuards(AuthGuard('jwt'))
  async delete(@IfAdmin() access: any, @Body() data: PostDelete) {
    return await this.postService.deletePost(access, data);
  }

  /**
   *
   * This method is called to update the post only with admin access
   *
   * @param access
   * @param data
   * @returns
   */
  @Put('update')
  @ApiOperation({ summary: 'update post' })
  @ApiBody({ description: 'Data to update post', type: PostUpdate })
  @UseGuards(AuthGuard('jwt'))
  async update(@IfAdmin() access: any, @Body() data: PostUpdate) {
    return await this.postService.updatePost(access, data);
  }

  /**
   *
   * This method is called to Get All the Post only if user is logged in
   * of any role
   *
   * @param user
   * @returns
   */
  @Get()
  @ApiOperation({ summary: 'get all post' })
  @UseGuards(AuthGuard('jwt'))
  async getPosts(@GetTokenData() user: any) {
    return await this.postService.getAllPosts(user);
  }
}
