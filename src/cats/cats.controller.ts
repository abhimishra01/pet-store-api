import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}
  @Get()
  getCats() {
    return this.catService.fetchAllCats();
  }

  @Get(':id')
  getCatBydId(@Param('id', ParseIntPipe) id: number) {
    return this.catService.fetchCatById(id);
  }

  @Post()
  createCat(@Body() createCatDto: CreateCatDto) {
    return this.catService.createCat(createCatDto);
  }

  @Post(':id')
  deleteCat(@Param('id', ParseIntPipe) id: number) {}
}
