import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Song } from '@prisma/client';
import { ApiPaginatedResponse } from 'src/common/decorators/apiPaginatedResponse';
import { PaginatedDto } from 'src/common/dtos/paginated.dto';
import { CreateSongDto } from './dto/create-song.dto';
import { FindAllSongsDto } from './dto/find-all-songs.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { FindAllSongsEntity } from './entities/find-all-songs.entity';
import { SongEntity } from './entities/song.entity';
import { SongsService } from './songs.service';

@ApiTags('Songs')
@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Get()
  @ApiPaginatedResponse(FindAllSongsEntity)
  async findAll(
    @Query() query: FindAllSongsDto,
  ): Promise<PaginatedDto<FindAllSongsEntity>> {
    const songs = await this.songsService.findAll(query);

    return songs;
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Success: returns song with album and artist',
    type: FindAllSongsEntity,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FindAllSongsEntity> {
    const song = await this.songsService.findOne(id);

    if (!song) {
      throw new NotFoundException(`Song with id '${id}' was not found`);
    }

    return song;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Success: returns created song',
    type: SongEntity,
  })
  async create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    const song = await this.songsService.create(createSongDto);

    return song;
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Success: returns updated song',
    type: SongEntity,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<Song> {
    const song = await this.songsService.update(id, updateSongDto);

    return song;
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Success: returns deleted song',
    type: SongEntity,
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Song> {
    const song = await this.songsService.remove(id);

    return song;
  }
}
