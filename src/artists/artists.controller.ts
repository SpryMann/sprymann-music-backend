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
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginatedDto } from 'src/common/dtos/paginated.dto';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FindAllArtistsDto } from './dto/find-all-artists.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@ApiTags('Artists')
@ApiExtraModels(PaginatedDto)
@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Success: returns an array of artists',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedDto) },
        {
          properties: {
            results: {
              type: 'array',
              items: { $ref: getSchemaPath(ArtistEntity) },
            },
          },
        },
      ],
    },
  })
  async findAll(
    @Query() query: FindAllArtistsDto,
  ): Promise<PaginatedDto<ArtistEntity>> {
    const artists = await this.artistsService.findAll(query);

    return artists;
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Success: returns an artist object',
    type: ArtistEntity,
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
