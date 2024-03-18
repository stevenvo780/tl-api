import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @IsString()
  @ApiProperty({ description: 'The title of the news item', type: String })
  title: string;

  @IsString()
  @ApiProperty({ description: 'The body of the news item', type: String })
  body: string;
}
