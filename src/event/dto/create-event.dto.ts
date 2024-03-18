import { IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @IsString()
  @ApiProperty({ description: 'The name of the event', type: String })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'The detailed description of the event',
    type: String,
  })
  description: string;

  @IsDateString()
  @ApiProperty({
    description: 'The start date and time of the event',
    type: 'string',
    format: 'date-time',
  })
  startDate: string;

  @IsDateString()
  @ApiProperty({
    description: 'The end date and time of the event',
    type: 'string',
    format: 'date-time',
  })
  endDate: string;
}
