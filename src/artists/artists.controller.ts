import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistsService } from './artists.service';

@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  findAll() {
    const artists = this.artistsService.findAll();

    return { message: 'Get all artists', data: artists };
  }
}
