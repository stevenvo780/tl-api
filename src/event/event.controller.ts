import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { RequestWithUser } from '../auth/types';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'Create a new event item' })
  @ApiCreatedResponse({
    description: 'The event item has been successfully created.',
  })
  @Post()
  create(
    @Request() req: RequestWithUser,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventService.create(createEventDto);
  }

  @ApiOperation({ summary: 'Get all event items' })
  @ApiResponse({
    status: 200,
    description: 'A list of all event items accessible by the user.',
  })
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @ApiOperation({ summary: 'Get a event item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The event item corresponding to the ID.',
  })
  @Get(':id')
  findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a event item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated event item.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @ApiOperation({ summary: 'Delete a event item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Confirmation of deletion.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
