import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistsService } from './artists.service';

@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  async findAll() {
    const artists = await this.artistsService.findAll();

    return { message: 'Get all artists', data: artists };
  }
}
