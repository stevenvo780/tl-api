import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { User } from '../user/entities/user.entity';
@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create(createContentDto: CreateContentDto, user: User) {
    const newContent = this.contentRepository.create(createContentDto);
    newContent.author = user;
    return this.contentRepository.save(newContent);
  }

  findAll(userId: number) {
    return this.contentRepository.find({
      where: { author: { id: userId } },
    });
  }

  findOne(id: number, userId: number) {
    return this.contentRepository.findOne({
      where: { id, author: { id: userId } },
    });
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    const content = await this.contentRepository.findOne({ where: { id } });
    Object.assign(content, updateContentDto);
    return this.contentRepository.save(content);
  }

  remove(id: number) {
    return this.contentRepository.delete(id);
  }
}
