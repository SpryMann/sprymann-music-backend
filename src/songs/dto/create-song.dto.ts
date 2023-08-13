import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSongDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({
    isArray: true,
    type: 'number',
  })
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  artists: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  albumId: number;
}
