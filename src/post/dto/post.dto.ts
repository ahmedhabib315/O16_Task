import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class PostCreate {
  @ApiProperty({ default: 'title1' })
  @IsString()
  title: string;
  
  @ApiProperty({ default: 'description1' })
  @IsString()
  description: string;

  @ApiProperty({ default: 'image1' })
  @IsOptional()
  @IsString()
  image: string;
}

export class PostUpdate {
  @ApiProperty({ default: 2 })
  @IsNumber()
  id: number;

  @ApiProperty({ default: 'title1' })
  @IsOptional()
  @IsString()
  title: string;
  
  @ApiProperty({ default: 'description1' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ default: 'image1' })
  @IsOptional()
  @IsString()
  image: string;
}

export class PostDelete {
  @ApiProperty({ default: 1 })
  @IsNumber()
  id: number;
}