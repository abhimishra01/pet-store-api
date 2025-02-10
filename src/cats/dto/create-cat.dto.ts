import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({ description: 'Name of the cat', example: 'Letty' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Breed of the cat', example: 'Persian' })
  @IsString()
  @IsOptional()
  breed?: string;
}
