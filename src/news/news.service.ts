import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    const newNews = this.newsRepository.create(createNewsDto);
    newNews.publicationDate = new Date();
    return this.newsRepository.save(newNews);
  }

  findAll() {
    return this.newsRepository.find();
  }

  findOne(id: number) {
    return this.newsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const news = await this.newsRepository.findOne({ where: { id } });
    Object.assign(news, updateNewsDto);
    return this.newsRepository.save(news);
  }

  remove(id: number) {
    return this.newsRepository.delete(id);
  }
}
