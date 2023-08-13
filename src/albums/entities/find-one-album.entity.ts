import { ApiProperty } from '@nestjs/swagger';
import { Album, Song } from '@prisma/client';
import { SongEntity } from 'src/songs/entities/song.entity';
import { ArtistWithIdAndName } from './find-all-albums.entity';

type AlbumWithArtistsAndSongs = Album & {
  artists: ArtistWithIdAndName[];
  songs: Song[];
};

export class FindOneAlbumEntity implements AlbumWithArtistsAndSongs {
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
