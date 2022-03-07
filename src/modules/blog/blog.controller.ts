import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/create.blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  async create(@Body() body: CreateBlogDto) {
    return await this.blogService.create(body);
  }
}
