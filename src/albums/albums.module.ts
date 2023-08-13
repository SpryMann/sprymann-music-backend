import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [PrismaModule],
})
export class AlbumsModule {}
