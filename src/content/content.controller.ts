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
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { RequestWithUser } from '../auth/types';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new content item' })
  @ApiCreatedResponse({
    description: 'The content item has been successfully created.',
  })
  @Post()
  create(
    @Request() req: RequestWithUser,
    @Body() createContentDto: CreateContentDto,
  ) {
    return this.contentService.create(createContentDto, req.user);
  }

  @ApiOperation({ summary: 'Get all content items' })
  @ApiResponse({
    status: 200,
    description: 'A list of all content items accessible by the user.',
  })
  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @ApiOperation({ summary: 'Get a content item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The content item corresponding to the ID.',
  })
  @Get(':id')
  findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.contentService.findOne(+id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a content item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated content item.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(+id, updateContentDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a content item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Confirmation of deletion.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(+id);
  }
}
