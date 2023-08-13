import { ApiProperty } from '@nestjs/swagger';
import { Album } from '@prisma/client';

export class AlbumEntity implements Album {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  cover: string;

  @ApiProperty()
  date: number;
}
