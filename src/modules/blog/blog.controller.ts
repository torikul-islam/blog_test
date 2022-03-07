import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/create.blog.dto';
import { CreateParagraphDto } from './dtos/create.paragraph.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/')
  async createBlog(@Body() body: CreateBlogDto) {
    return await this.blogService.createBlog(body);
  }
  @Post('/paragraph')
  async createParagraph(@Body() body: CreateParagraphDto) {
    return await this.blogService.createParagraph(body);
  }
}
