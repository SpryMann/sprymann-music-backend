import { ApiProperty } from '@nestjs/swagger';
import { Album } from '@prisma/client';
import { ArtistWithIdAndName } from './find-all-albums.entity';

type AlbumWithArtists = Album & {
  artists: {
    id: number;
    name: string;
  }[];
};

export class FindOneAlbumEntity implements AlbumWithArtists {
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
