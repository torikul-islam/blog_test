import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Blog extends Document {
  @Prop({
    required: [true, 'title is required.'],
    trim: true,
    type: String,
  })
  title: string;

  @Prop({
    required: [true, 'description is required.'],
    trim: true,
    type: String,
  })
  description: string;

  @Prop({
    required: [true, 'author is required.'],
    trim: true,
    type: String,
  })
  author: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
