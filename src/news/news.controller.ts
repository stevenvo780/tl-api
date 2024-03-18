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
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
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
@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'Create a new news item' })
  @ApiCreatedResponse({
    description: 'The news item has been successfully created.',
  })
  @Post()
  create(
    @Request() req: RequestWithUser,
    @Body() createNewsDto: CreateNewsDto,
  ) {
    return this.newsService.create(createNewsDto);
  }

  @ApiOperation({ summary: 'Get all news items' })
  @ApiResponse({
    status: 200,
    description: 'A list of all news items accessible by the user.',
  })
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @ApiOperation({ summary: 'Get a news item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The news item corresponding to the ID.',
  })
  @Get(':id')
  findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a news item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated news item.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @ApiOperation({ summary: 'Delete a news item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Confirmation of deletion.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
