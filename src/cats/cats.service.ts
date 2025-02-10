import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { GetCatDto } from './dto/get-cat.dto';

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    { id: 1, name: 'kitty', breed: 'indian' },
    { id: 2, name: 'cat', breed: 'persian' },
    { id: 3, name: 'whiskers', breed: 'indian' },
    { id: 4, name: 'kitty', breed: 'indian' },
  ];

  fetchAllCats(payload?: GetCatDto): Cat[] {
    if (this.cats.length === 0) {
      throw new NotFoundException('No cats found!');
    }

    // If no filters are provided, return all cats
    try {
      if (!payload || Object.keys(payload).length === 0) {
        return this.cats;
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    // filteredCats
    const filteredCats = this.cats.filter((cat) => {
      return (
        (!payload.name || cat.name === payload.name) &&
        (!payload.breed || cat.breed === payload.breed)
      );
    });
    if (filteredCats.length === 0) {
      throw new NotFoundException('No cats found!');
    }

    return filteredCats;
  }

  fetchCatById(id: number) {
    if (!id) {
      throw new BadRequestException(
        'Please provide a valid `id` in Query param',
      );
    }

    const cat = this.cats.find((ct) => ct.id === id);
    if (!cat) {
      throw new NotFoundException(`No cat found with provided id : ${id}`);
    }

    return cat;
  }

  createCat(createCatDto: CreateCatDto) {
    if (!createCatDto) {
      throw new BadRequestException('Please provide correct payload');
    }

    try {
      const newCat = { id: Date.now(), ...createCatDto };
      this.cats.push(newCat);
      return { message: 'Cat Created Successfuly!' };
    } catch (error) {
      // log the error via logger
      throw new InternalServerErrorException(error.message);
    }
  }

  deleteCat(id: number) {
    if (!id) {
      throw new BadRequestException(
        'Please provide a valid `id` in Query param',
      );
    }

    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex == -1) {
      throw new NotFoundException(`Please provide a valid cat id`);
    }
    try {
      this.cats.filter((cat) => cat.id === id);
      return { message: 'Successfuly deleted the cat entry!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
