import { Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private cats: Cat[] = [{ id: 0, name: 'kitty', breed: 'indian' }];

  fetchAllCats(): Cat[] {
    return this.cats;
  }
}
