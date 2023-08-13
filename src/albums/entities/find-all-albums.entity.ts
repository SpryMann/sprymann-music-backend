import { ApiProperty } from '@nestjs/swagger';
import { Album, Artist } from '@prisma/client';

export class ArtistWithIdAndName
  implements Omit<Artist, 'description' | 'image' | 'genre'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

type AlbumWithArtists = Album & {
  artists: {
    id: number;
    name: string;
  }[];
};

export class FindAllAlbumsEntity implements AlbumWithArtists {
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

  @ApiProperty({
    isArray: true,
    type: ArtistWithIdAndName,
  })
  artists: ArtistWithIdAndName[];
}
