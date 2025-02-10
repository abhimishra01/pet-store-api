import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CatsService Test cases', () => {
  let service: CatsService;
  let cat = { id: 1, name: 'kitty', breed: 'indian' };
  let cats: Cat[] = [cat];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchAllCats tests', () => {
    describe('Success scenario', () => {
      it('fetchAllCats should be defined', () => {
        expect(service.fetchAllCats).toBeDefined();
      });

      it('fetchAllCats should return all cats', () => {
        expect(service.fetchAllCats()).toEqual(cats);
      });
    });
    describe('Failure scenarios', () => {
      it('fetchAllCats should throw not found 404 error', () => {
        jest.spyOn(service, 'fetchAllCats').mockImplementation(() => {
          throw new NotFoundException('No cats found!');
        });
        expect(() => service.fetchAllCats()).toThrow(NotFoundException);
        expect(() => service.fetchAllCats()).toThrow('No cats found!');
      });
    });
  });

  describe('fetchCatById', () => {
    let catId;

    beforeEach(() => {
      catId = 1;
    });

    describe('success scenario', () => {
      it('fetchCatById should be defined', () => {
        expect(service.fetchCatById).toBeDefined();
      });

      it('fetchCatById should return all cats', () => {
        expect(service.fetchCatById(catId)).toEqual(cat);
      });
    });

    describe('failure scenario', () => {
      it('fetchCatById should throw if no Id provided', () => {
        expect(() =>
          service.fetchCatById(undefined as unknown as number),
        ).toThrow(BadRequestException);
        expect(() =>
          service.fetchCatById(undefined as unknown as number),
        ).toThrow('Please provide a valid `id` in Query param');
      });

      it('fetchCatById should throw if no cats found', () => {
        catId = 999;
        expect(() => service.fetchCatById(catId)).toThrow(NotFoundException);
        expect(() => service.fetchCatById(catId)).toThrow(
          `No cat found with provided id : ${catId}`,
        );
      });
    });
  });
});
