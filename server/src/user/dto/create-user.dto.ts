import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsEmail() email: string;
  @IsString() username: string;
  @IsString() firstName: string;
  @IsString() lastName: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  timezone?: string;
}
