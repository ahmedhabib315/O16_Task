import { IsEmail, IsEnum, IsString } from "class-validator";
import { Role } from "../enum/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UserSignin {
  @ApiProperty({ default: 'abc@gmail.com' })
  @IsEmail()
  email: string;
  
  @ApiProperty({ default: 'test' })
  @IsString()
  password: string;
}

export class UserSignup {
  @ApiProperty({ default: 'abc@gmail.com' })
  @IsEmail()
  email: string;
  
  @ApiProperty({ default: 'test' })
  @IsString()
  password: string;

  @ApiProperty({ default: 'abc user'})
  @IsString()
  username: string;

  @ApiProperty({default: 'admin'})
  @IsEnum(Role)
  role: Role;
}