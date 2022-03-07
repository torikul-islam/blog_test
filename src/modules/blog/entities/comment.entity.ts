import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Comment extends Document {
  @Prop({
    required: [true, 'title is required.'],
    trim: true,
    type: String,
  })
  body: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Paragraph',
  })
  paragraph: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
