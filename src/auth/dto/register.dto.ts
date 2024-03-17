import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { roles } from '../../user/entities/user.entity';

export class RegisterUserDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user', type: String })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The password of the user', type: String })
  password: string;

  @IsString()
  @ApiProperty({ description: 'The name of the user', type: String })
  name: string;

  @IsString()
  @ApiProperty({ description: 'The nick name of the user', type: String })
  nickName: string;

  @IsString()
  @ApiProperty({ description: 'The phone of the user', type: String })
  phone: string;

  @IsString()
  @ApiProperty({ description: 'The document number of the user', type: String })
  documentNumber: string;

  @IsString()
  @ApiProperty({ description: 'The role of the user', type: String })
  role: roles;
}
