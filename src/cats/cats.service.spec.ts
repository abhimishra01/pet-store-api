import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

describe('CatsService Test cases', () => {
  let service: CatsService;
  let cat = { id: 1, name: 'kitty', breed: 'indian' };
  let cats: Cat[] = [
    { id: 1, name: 'kitty', breed: 'indian' },
    { id: 2, name: 'cat', breed: 'persian' },
    { id: 3, name: 'whiskers', breed: 'indian' },
    { id: 4, name: 'kitty', breed: 'indian' },
  ];

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
    let breed = 'indian';
    let name = 'kitty';
    describe('Success scenario', () => {
      it('fetchAllCats should be defined', () => {
        expect(service.fetchAllCats).toBeDefined();
      });

      it('fetchAllCats should return all cats', () => {
        expect(service.fetchAllCats()).toEqual(cats);
      });

      it('it should filter the cats by breed', () => {
        const filterCats = cats.filter((cat) => cat.breed === breed);
        expect(service.fetchAllCats({ breed })).toEqual(filterCats);
      });

      it('it should filter the cats by name', () => {
        const filterCats = cats.filter((cat) => cat.name === name);
        expect(service.fetchAllCats({ name })).toEqual(filterCats);
      });
    });

    describe('Failure scenarios', () => {
      let errorMessage;
      it('fetchAllCats should throw not found 404 error', () => {
        errorMessage = 'No Cats Found!';
        jest.spyOn(service, 'fetchAllCats').mockImplementation(() => {
          throw new NotFoundException(errorMessage);
        });
        expect(() => service.fetchAllCats()).toThrow(NotFoundException);
        expect(() => service.fetchAllCats()).toThrow(errorMessage);
      });

      it('it should throw internal server error', () => {
        errorMessage = 'Internal Server Error';
        jest.spyOn(service, 'fetchAllCats').mockImplementation(() => {
          throw new InternalServerErrorException(errorMessage);
        });
        expect(() => service.fetchAllCats()).toThrow(
          InternalServerErrorException,
        );
        expect(() => service.fetchAllCats()).toThrow(errorMessage);
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
        expect(service.fetchCatById(catId)).toEqual(cats[0]);
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

  describe('createCat', () => {
    let newCat = { name: 'Percy', breed: 'Persian' };

    describe('success', () => {
      it('should be defined', () => {
        expect(service.createCat).toBeDefined();
      });

      it('should create a new cat', () => {
        expect(service.createCat(newCat)).toEqual({
          message: 'Cat Created Successfuly!',
        });
      });
    });
    describe('failure', () => {
      let errorMessage;

      it('should throw in case no payload passed', () => {
        errorMessage = 'Please provide correct payload';

        expect(() =>
          service.createCat(undefined as unknown as CreateCatDto),
        ).toThrow(BadRequestException);
        expect(() =>
          service.createCat(undefined as unknown as CreateCatDto),
        ).toThrow('Please provide correct payload');
      });

      it('should throw InternalServerErrorException if an error occurs', () => {
        jest.spyOn(service, 'createCat').mockImplementation(() => {
          throw new InternalServerErrorException('Something went wrong');
        });

        expect(() => service.createCat(CreateCatDto)).toThrow(
          InternalServerErrorException,
        );
        expect(() => service.createCat(CreateCatDto)).toThrow(
          'Something went wrong',
        );
      });
    });
  });

  describe('deleteCat', () => {
    let catId = 1;

    describe('success', () => {
      it('should be defined', () => {
        expect(service.deleteCat).toBeDefined();
      });

      it('should delete the cat and return the success response', () => {
        expect(service.deleteCat(catId)).toEqual({
          message: 'Successfuly deleted the cat entry!',
        });
      });
    });
    describe('failure', () => {
      let errorMessage;

      it('shold throw not found exception if the id is invalid', () => {
        errorMessage = `Please provide a valid cat id`;
        expect(() => service.deleteCat(999)).toThrow(NotFoundException);
        expect(() => service.deleteCat(999)).toThrow(errorMessage);
      });

      it('should throw a Bad request exception if no id provided', () => {
        errorMessage = 'Please provide a valid `id` in Query param';
        expect(() => service.deleteCat(undefined as unknown as number)).toThrow(
          BadRequestException,
        );

        expect(() => service.deleteCat(undefined as unknown as number)).toThrow(
          errorMessage,
        );
      });

      it('should throw InternalServerErrorException in case of unknown exceptions', () => {
        errorMessage = 'Something went wrong!';
        jest.spyOn(service, 'deleteCat').mockImplementation(() => {
          throw new InternalServerErrorException(errorMessage);
        });

        expect(() => service.deleteCat(catId)).toThrow(
          InternalServerErrorException,
        );
        expect(() => service.deleteCat(catId)).toThrow(errorMessage);
      });
    });
  });
});
