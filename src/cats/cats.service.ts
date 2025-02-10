import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private cats: Cat[] = [{ id: 1, name: 'kitty', breed: 'indian' }];

  fetchAllCats(): Cat[] {
    if (this.cats.length === 0) {
      throw new NotFoundException('No cats found!');
    }

    return this.cats;
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

  createCat(createCatDto: CreateCatDto) {}

  deleteCat(id: number) {}
}
