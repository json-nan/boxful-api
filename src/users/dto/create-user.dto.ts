import {
  IsDateString,
  IsEmail,
  IsIn,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(50)
  last_name: string;

  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsDateString()
  birth_date: Date;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MaxLength(50)
  phone: string;

  @IsString()
  @MaxLength(255)
  password: string;
}
