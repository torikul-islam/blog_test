import { Body } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/create.blog.dto';
import { CreateCommentDto } from './dtos/create.comment.dto';
import { CreateParagraphDto } from './dtos/create.paragraph.dto';
import { FilterBlogDto } from './dtos/filter.blog.dto';
import { FilterParagraphDto } from './dtos/filter.paragraph.dto';
import { UpdateParagraphDto } from './dtos/update.paragraph.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/')
  async createBlog(@Body() body: CreateBlogDto) {
    return await this.blogService.createBlog(body);
  }

  @Get('/')
  async getBlogs(@Query() filter: FilterBlogDto) {
    return await this.blogService.getBlogs(filter);
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

  @Delete('/paragraph/:id')
  async deleteParagraph(@Param('id') id: string) {
    return await this.blogService.deleteParagraph(id);
  }

  @Post('/comment')
  async createComment(@Body() body: CreateCommentDto) {
    return await this.blogService.createComment(body);
  }

  @Get('/:id/paragraph')
  async getParagraphs(
    @Param('id') id: string,
    @Query() filter: FilterParagraphDto,
  ) {
    return await this.blogService.getParagraphs(id, filter);
  }
}
