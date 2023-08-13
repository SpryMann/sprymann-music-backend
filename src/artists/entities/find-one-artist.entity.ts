import { ApiProperty } from '@nestjs/swagger';
import { Album, Artist, Song } from '@prisma/client';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { SongEntity } from 'src/songs/entities/song.entity';

type ArtistWithAlbumsAndSongs = Artist & {
  albums: Album[];
  songs: Song[];
};

export class FindOneArtistEntity implements ArtistWithAlbumsAndSongs {
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

  @ApiProperty({
    isArray: true,
    type: SongEntity,
  })
  songs: {
    id: number;
    title: string;
    image: string;
    source: string;
    duration: number;
    albumId: number;
  }[];
}
