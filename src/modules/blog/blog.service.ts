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
import { FilterBlogDto } from './dtos/filter.blog.dto';
import { FilterParagraphDto } from './dtos/filter.paragraph.dto';
import mongoose from 'mongoose';

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

  async getBlogs(filter: FilterBlogDto): Promise<Blog[]> {
    const { page, limit, ...rest } = filter;
    const blog: Blog[] = await this.blogModel
      .find(rest)
      .limit(limit)
      .skip((page - 1) * limit)
      .select(['-__v']);
    return blog;
  }

  async createParagraph(body: CreateParagraphDto): Promise<Paragraph> {
    const seq: Paragraph[] = await this.paraModel
      .find({ blog: body.blog })
      .sort({ seq: 1 })
      .select('id seq');
    const paragraph: Paragraph = await this.paraModel.create(body);
    if (body.seq) {
      seq.splice(body.seq - 1, 0, paragraph);
      await this.paraModel.bulkWrite(
        seq.map((doc, i) => ({
          updateOne: {
            filter: { _id: doc._id },
            update: { seq: i + 1 },
            upsert: true,
          },
        })),
      );
    } else paragraph.seq += seq.length;
    await paragraph.save();
    return paragraph;
  }

  async getParagraphs(id: string, filter: FilterParagraphDto) {
    const { page, limit, ...rest } = filter;
    const paragraph = await this.blogModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'paragraphs',
          localField: '_id',
          foreignField: 'blog',
          as: 'paragraphs',
        },
      },
      {
        $project: {
          _id: '$_id',
          author: '$author',
          description: '$description',
          title: '$title',
          createdAt: '$createdAt',
          paragraphs: { $slice: ['$paragraphs', (page - 1) * limit, limit] },
        },
      },
    ]);
    if (!paragraph.length) throw new BadRequestException('Invalid blog id.');
    return paragraph[0];
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

  async deleteParagraph(id: string): Promise<Paragraph> {
    const paragraph: Paragraph = await this.paraModel.findOne({ _id: id });
    if (!paragraph) throw new BadRequestException('Invalid paragraph id.');
    const seq: Paragraph[] = await this.paraModel
      .find({ blog: paragraph.blog })
      .sort({ seq: 1 })
      .select('id seq');
    const index = seq.findIndex((doc) => String(doc._id) === id);
    seq.splice(index, 1);
    await this.paraModel.bulkWrite(
      seq.map((doc, i) => ({
        updateOne: {
          filter: { _id: doc._id },
          update: { seq: i + 1 },
          upsert: true,
        },
      })),
    );
    await paragraph.remove();
    return paragraph;
  }

  async createComment(body: CreateCommentDto): Promise<Comment> {
    const comment: Comment = await this.commentModel.create(body);
    await comment.save();
    return comment;
  }
}
