import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetCatDto {
  @ApiPropertyOptional({
    description: 'Filter cats by name',
    example: 'Whiskers',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter cats by breed',
    example: 'Siamese',
  })
  @IsOptional()
  @IsString()
  breed?: string;
}
