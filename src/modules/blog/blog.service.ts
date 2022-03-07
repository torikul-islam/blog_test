import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dtos/create.blog.dto';
import { Paragraph } from './entities/paragraph.entity';
import { CreateParagraphDto } from './dtos/create.paragraph.dto';
import { CreateCommentDto } from './dtos/create.comment.dto';
import { Comment } from './entities/comment.entity';
import { UpdateParagraphDto } from './dtos/update.paragraph.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Paragraph.name) private paraModel: Model<Paragraph>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async createBlog(body: CreateBlogDto): Promise<Blog> {
    const blog: Blog = await this.blogModel.create(body);
    await blog.save();
    return blog;
  }

  async createParagraph(body: CreateParagraphDto): Promise<Paragraph> {
    const paragraph: Paragraph = await this.paraModel.create(body);
    await paragraph.save();
    return paragraph;
  }

  async updateParagraph(
    id: string,
    body: UpdateParagraphDto,
  ): Promise<Paragraph> {
    const paragraph: Paragraph = await this.paraModel.findOne({ _id: id });
    if (!paragraph) throw new BadRequestException('Invalid paragraph id.');
    Object.keys(body).forEach((key) => {
      paragraph[key] = body[key];
    });
    await paragraph.save();
    return paragraph;
  }

  async createComment(body: CreateCommentDto): Promise<Comment> {
    const comment: Comment = await this.commentModel.create(body);
    await comment.save();
    return comment;
  }
}
