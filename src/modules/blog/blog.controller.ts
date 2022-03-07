import { Body } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/create.blog.dto';
import { CreateCommentDto } from './dtos/create.comment.dto';
import { CreateParagraphDto } from './dtos/create.paragraph.dto';
import { UpdateParagraphDto } from './dtos/update.paragraph.dto';

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

  @Put('/paragraph/:id')
  async updateParagraph(
    @Param('id') id: string,
    @Body() body: UpdateParagraphDto,
  ) {
    return await this.blogService.updateParagraph(id, body);
  }

  @Post('/comment')
  async createComment(@Body() body: CreateCommentDto) {
    return await this.blogService.createComment(body);
  }
}
