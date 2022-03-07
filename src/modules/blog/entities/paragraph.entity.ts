import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Paragraph extends Document {
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
  body: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Blog',
  })
  blog: Types.ObjectId;
}

export const ParagraphSchema = SchemaFactory.createForClass(Paragraph);
