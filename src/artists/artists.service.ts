import { Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FindOneArtistEntity } from './entities/find-one-artist.entity';

@Injectable()
export class ArtistsService {
  constructor(private prismaService: PrismaService) {}

  async findAll({ page = 1, limit = 12 }): Promise<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    results: Artist[];
  }> {
    const [count, results] = await this.prismaService.$transaction([
      this.prismaService.artist.count(),
      this.prismaService.artist.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(count / limit);

    return {
      total: count,
      page,
      limit,
      totalPages,
      results,
    };
  }

  async findOne(id: number): Promise<FindOneArtistEntity | null> {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
      include: {
        albums: {
          select: {
            album: true,
          },
        },
      },
    });

    if (!artist) {
      return null;
    }

    const albums = artist.albums.map((album) => ({ ...album.album }));

    return {
      ...artist,
      albums,
    };
  }

  create(createArtistDto: CreateArtistDto) {
    return this.prismaService.artist.create({ data: createArtistDto });
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return this.prismaService.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  remove(id: number) {
    return this.prismaService.artist.delete({ where: { id } });
  }
}
