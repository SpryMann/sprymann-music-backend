import { Injectable } from '@nestjs/common';
import { Song } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { FindAllSongsEntity } from './entities/find-all-songs.entity';

@Injectable()
export class SongsService {
  constructor(private prismaService: PrismaService) {}

  async findAll({
    artistId,
    albumId,
    page = 1,
    limit = 12,
  }: {
    artistId?: number;
    albumId?: number;
    page?: number;
    limit?: number;
  }): Promise<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    results: FindAllSongsEntity[];
  }> {
    const [total, items] = await this.prismaService.$transaction([
      this.prismaService.song.count({
        where: {
          albumId,
          artists: {
            some: {
              artistId,
            },
          },
        },
      }),
      this.prismaService.song.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          albumId,
          artists: {
            some: {
              artistId,
            },
          },
        },
        include: {
          artists: {
            select: {
              artist: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          album: {
            select: {
              id: true,
              title: true,
              date: true,
            },
          },
        },
      }),
    ]);
    const results = items.map((item) => {
      const artists = item.artists.map((artist) => ({ ...artist.artist }));

      return {
        ...item,
        artists,
      };
    });
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      page,
      limit,
      totalPages,
      results,
    };
  }

  async findOne(id: number): Promise<FindAllSongsEntity | null> {
    const song = await this.prismaService.song.findUnique({
      where: { id },
      include: {
        album: true,
        artists: {
          select: {
            artist: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!song) {
      return null;
    }

    const artists = song.artists.map(({ artist }) => ({ ...artist }));

    return {
      ...song,
      artists,
    };
  }

  create(createSongDto: CreateSongDto): Promise<Song> {
    const { title, image, source, duration, artists, albumId } = createSongDto;
    const connectArtists = artists.map((artist) => {
      return {
        artist: {
          connect: {
            id: artist,
          },
        },
      };
    });

    return this.prismaService.song.create({
      data: {
        artists: {
          create: connectArtists,
        },
        title,
        image,
        source,
        duration,
        albumId,
      },
    });
  }

  update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
    const { title, image, source, duration, albumId, artists } = updateSongDto;
    const data = { title, image, source, duration, albumId };
    const connectArtists = artists.map((artist) => {
      return {
        artist: {
          connect: {
            id: artist,
          },
        },
      };
    });

    return this.prismaService.song.update({
      where: { id },
      data: {
        ...data,
        artists: {
          deleteMany: {},
          create: connectArtists,
        },
      },
    });
  }

  remove(id: number): Promise<Song> {
    return this.prismaService.song.delete({
      where: { id },
    });
  }
}
