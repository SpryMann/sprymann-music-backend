import { ApiProperty } from '@nestjs/swagger';
import { Album, Song } from '@prisma/client';
import { ArtistWithIdAndName } from 'src/albums/entities/find-all-albums.entity';

class AlbumWithIdTitleAndDate implements Omit<Album, 'type' | 'cover'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  date: number;
}

type SongWithAlbumAndArtists = Song & {
  album: AlbumWithIdTitleAndDate;
  artists: ArtistWithIdAndName[];
};

export class FindAllSongsEntity implements SongWithAlbumAndArtists {
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

  @ApiProperty({
    type: AlbumWithIdTitleAndDate,
  })
  album: AlbumWithIdTitleAndDate;

  @ApiProperty({
    isArray: true,
    type: ArtistWithIdAndName,
  })
  artists: ArtistWithIdAndName[];
}
