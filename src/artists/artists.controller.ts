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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FindAllArtistsDto } from './dto/find-all-artists.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { FindOneArtistEntity } from './entities/find-one-artist.entity';

@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  @ApiPaginatedResponse(ArtistEntity)
  async findAll(
    @Query() query: FindAllArtistsDto,
  ): Promise<PaginatedDto<ArtistEntity>> {
    const artists = await this.artistsService.findAll(query);

    return artists;
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Success: returns an artist object',
    type: FindOneArtistEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id '${id}' doesn't exist`);
    }

    return artist;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Success: returns created artist object',
    type: ArtistEntity,
  })
  async create(@Body() createArtistDto: CreateArtistDto) {
    const artist = await this.artistsService.create(createArtistDto);

    return artist;
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Success: returns updated artist object',
    type: ArtistEntity,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.update(id, updateArtistDto);

    return artist;
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Success: returns removed artist object',
    type: ArtistEntity,
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const artist = await this.artistsService.remove(id);

    return artist;
  }
}
