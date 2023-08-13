import { ApiProperty } from '@nestjs/swagger';
import { Song } from '@prisma/client';

export class SongEntity implements Song {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  source: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  albumId: number;
}
