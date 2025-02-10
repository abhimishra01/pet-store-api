import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  @ApiProperty({ description: 'Unique Identity' })
  id: number;
  @ApiProperty({ description: 'Name of the cat' })
  name: string;
  @ApiProperty({ required: false, description: 'Breed of the cat' })
  breed?: string;
}
