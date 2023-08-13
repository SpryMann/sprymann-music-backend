import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class FindAllAlbumsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  limit?: number = 12;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  artistId?: number;
}
