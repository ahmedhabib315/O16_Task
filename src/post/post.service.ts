import { PrismaService } from '@app/lib/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from 'src/user/enum/role.enum';
import { PostCreate } from './dto/post.dto';
import { CONSTANTS } from 'src/constants';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}


  /**
   * 
   * Create a New Post with Admin Role Only
   * 
   * @param user 
   * @param data 
   * @returns 
   */
  async create(user, data: PostCreate){
    if(user && user.role == Role.ADMIN){
      return await this.prisma.posts.create({
        data: {...data, createdBy: user.email}
      });
    }
    else{
      throw new UnauthorizedException(CONSTANTS.exceptionMessages.createPost);
    }
  }

  /**
   * 
   * Get All Post Data only if any user is logged in
   * 
   * @param user 
   * @returns 
   */
  async getAllPosts(user){
    if(user){
      return await this.prisma.posts.findMany({
        include: {
          user: {
            select: {
              username: true,
            }
          }
        }
      });
    }
    else{
      throw new UnauthorizedException(CONSTANTS.exceptionMessages.getPosts);
    }
  }

  /**
   * 
   * Update an Old Post with Admin Role Only
   * 
   * @param isAdmin 
   * @param data 
   * @returns 
   */
  async updatePost(isAdmin, data){
    if(isAdmin){
      return await this.prisma.posts.update({
        where: {
          id: data.id
        },
        data:{...data}
      });
    }
    else{
      throw new UnauthorizedException(CONSTANTS.exceptionMessages.updatePosts);
    }
  }

  /**
   * 
   * Delete an Old Post with Admin Role Only
   * 
   * @param isAdmin 
   * @param data 
   * @returns 
   */
  async deletePost(isAdmin, data){
    if(isAdmin){
      return await this.prisma.posts.delete({
        where: {
          id: data.id
        }
      });
    }
    else{
      throw new UnauthorizedException(CONSTANTS.exceptionMessages.deletePosts);
    }
  }

}
