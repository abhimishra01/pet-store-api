import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ description: 'Name of the cat' })
  name: string;
  @ApiProperty({ required: false, description: 'Breed of the cat' })
  breed?: string;
}
