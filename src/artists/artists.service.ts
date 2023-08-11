import { Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prismaService: PrismaService) {}

  findAll(): Promise<Artist[]> {
    return this.prismaService.artist.findMany();
  }
}
