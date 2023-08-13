import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: 'album' | 'single';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cover: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  date: number;

  @ApiProperty({
    isArray: true,
    type: 'number',
  })
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  artists: number[];
}
