import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '@prisma/client';

export class ArtistEntity implements Artist {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  genre: string;
}
