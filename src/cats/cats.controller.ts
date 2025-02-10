import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Cat } from './entities/cat.entity';
import { GetCatDto } from './dto/get-cat.dto';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all cats' })
  @ApiOkResponse({ type: Cat, isArray: true, description: 'All the cats' })
  @ApiNotFoundResponse({ description: 'No cats found!' })
  @ApiResponse({ status: 500, description: 'Internal Server Error!' })
  getCats(@Query() queryParams: GetCatDto) {
    return this.catService.fetchAllCats(queryParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a cat details by id' })
  @ApiOkResponse({ type: Cat, description: 'The cat details' })
  getCatBydId(@Param('id', ParseIntPipe) id: number) {
    return this.catService.fetchCatById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new cat record' })
  @ApiBody({
    type: CreateCatDto,
    description: 'Payload to create a new cat record',
  })
  @ApiResponse({
    status: 201,
    description: 'Cat created successfuly',
  })
  @ApiResponse({ status: 400, description: 'Please provide correct payload' })
  @ApiResponse({ status: 500, description: 'Internal Server Error!' })
  createCat(@Body() createCatDto: CreateCatDto) {
    return this.catService.createCat(createCatDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'Successfuly deleted the cat entry!',
  })
  @ApiResponse({
    status: 400,
    description: 'Please provide a valid `id` in Query param',
  })
  @ApiResponse({
    status: 404,
    description: `Provided Cat Id Doesn't exist`,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error!',
  })
  @ApiNotFoundResponse({
    description: `Not found`,
  })
  @ApiOperation({ summary: 'Delete a cat by Id' })
  deleteCat(@Param('id', ParseIntPipe) id: number) {
    return this.catService.deleteCat(id);
  }
}
