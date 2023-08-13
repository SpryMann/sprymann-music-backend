import { Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FindAllAlbumsEntity } from './entities/find-all-albums.entity';
import { FindOneAlbumEntity } from './entities/find-one-album.entity';

@Injectable()
export class AlbumsService {
  constructor(private prismaService: PrismaService) {}

  async findAll({
    artistId,
    page = 1,
    limit = 12,
  }: {
    artistId?: number;
    page?: number;
    limit?: number;
  }): Promise<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    results: FindAllAlbumsEntity[];
  }> {
    const [total, items] = await this.prismaService.$transaction([
      this.prismaService.album.count(),
      this.prismaService.album.findMany({
        where: {
          artists: {
            some: {
              artistId,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
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

  async findOne(id: number): Promise<FindOneAlbumEntity | null> {
    const album = await this.prismaService.album.findUnique({
      where: { id },
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
      },
    });

    if (!album) {
      return null;
    }

    const artists = album.artists.map((artist) => ({ ...artist.artist }));

    return {
      ...album,
      artists,
    };
  }

  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { title, type, cover, date, artists } = createAlbumDto;
    const connectArtists = artists.map((artist) => ({
      artist: {
        connect: {
          id: artist,
        },
      },
    }));

    return this.prismaService.album.create({
      data: {
        artists: {
          create: connectArtists,
        },
        title,
        type,
        cover,
        date,
      },
    });
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const { title, type, cover, date, artists } = updateAlbumDto;
    const data = { title, type, cover, date };
    const connectArtists = artists.map((artist) => ({
      artist: {
        connect: {
          id: artist,
        },
      },
    }));

    return this.prismaService.album.update({
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

  remove(id: number) {
    return this.prismaService.album.delete({
      where: { id },
    });
  }
}
