import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCatDto {
  @ApiProperty({ description: 'Name of the cat', example: 'Letty' })
  @IsString()
  @IsAlphanumeric()
  @MaxLength(10)
  name: string;

  @ApiPropertyOptional({ description: 'Breed of the cat', example: 'Persian' })
  @IsString()
  @IsOptional()
  @MaxLength(15)
  breed?: string;
}
