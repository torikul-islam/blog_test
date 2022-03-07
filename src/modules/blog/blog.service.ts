import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dtos/create.blog.dto';
import { Paragraph } from './entities/paragraph.entity';
import { CreateParagraphDto } from './dtos/create.paragraph.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Paragraph.name) private paraModel: Model<Paragraph>,
  ) {}

  async createBlog(body: CreateBlogDto) {
    const blog = await this.blogModel.create(body);
    await blog.save();
    return blog;
  }

  async createParagraph(body: CreateParagraphDto) {
    console.log(body);
    const paragraph = await this.paraModel.create(body);
    await paragraph.save();
    return paragraph;
  }
}
