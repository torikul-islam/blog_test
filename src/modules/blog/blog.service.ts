import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dtos/create.blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(body: CreateBlogDto) {
    const blog = await this.blogModel.create(body);
    await blog.save();
    return blog;
  }
}
