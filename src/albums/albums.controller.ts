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
import { ApiPaginatedResponse } from 'src/common/decorators/apiPaginatedResponse';
import { PaginatedDto } from 'src/common/dtos/paginated.dto';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FindAllAlbumsDto } from './dto/find-all-albums.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { FindAllAlbumsEntity } from './entities/find-all-albums.entity';
import { FindOneAlbumEntity } from './entities/find-one-album.entity';

@ApiTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  @ApiPaginatedResponse(FindAllAlbumsEntity)
  async findAll(
    @Query() query: FindAllAlbumsDto,
  ): Promise<PaginatedDto<FindAllAlbumsEntity>> {
    const albums = await this.albumsService.findAll(query);

    return albums;
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Success: returns specific album',
    type: FindOneAlbumEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException(`Album with id '${id}' doesn't exist`);
    }

    return album;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Success: returns create album',
    type: AlbumEntity,
  })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const artist = await this.albumsService.create(createAlbumDto);

    return artist;
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Returns updated album',
    type: AlbumEntity,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.update(id, updateAlbumDto);

    return album;
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Success: returns deleted album',
    type: AlbumEntity,
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const album = await this.albumsService.remove(id);

    return album;
  }
}
