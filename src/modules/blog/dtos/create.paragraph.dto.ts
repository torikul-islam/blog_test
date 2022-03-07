import { IsNotEmpty, IsString } from 'class-validator';

export class CreateParagraphDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  blog: string;
}
