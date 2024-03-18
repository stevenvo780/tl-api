import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the content',
    type: String,
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'The body of the content',
    type: String,
  })
  body: string;
}
