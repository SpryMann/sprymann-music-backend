import { ApiProperty } from '@nestjs/swagger';
import { Album, Artist } from '@prisma/client';
import { AlbumEntity } from 'src/albums/entities/album.entity';

type ArtistWithAlbums = Artist & {
  albums: Album[];
};

export class FindOneArtistEntity implements ArtistWithAlbums {
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

  @ApiProperty({
    isArray: true,
    type: AlbumEntity,
  })
  albums: Album[];
}
