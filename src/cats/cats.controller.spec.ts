import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { NotFoundException } from '@nestjs/common';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;
  let cat = { id: 1, name: 'kitty', breed: 'indian' };
  let cats: Cat[] = [cat];

  // no need to test service methods while testing controllers
  const mockCatsService = {
    fetchAllCats: jest.fn(),
    fetchCatById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [{ provide: CatsService, useValue: mockCatsService }],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCats', () => {
    describe('success', () => {
      it('should be return cats', () => {
        const cats = [{ id: 1, name: 'kitty', breed: 'indian' }];
        mockCatsService.fetchAllCats.mockReturnValue(cats);

        expect(controller.getCats()).toEqual(cats);
        expect(service.fetchAllCats).toHaveBeenCalledTimes(1);
      });

      describe('failure', () => {
        it('should throw NotFoundException if no cats are found', () => {
          mockCatsService.fetchAllCats.mockImplementation(() => {
            throw new NotFoundException('No cats found!');
          });

          expect(() => controller.getCats()).toThrow(NotFoundException);
          expect(() => controller.getCats()).toThrow('No cats found!');
        });
      });
    });
  });

  describe('getCatById', () => {
    let catId = 1;

    describe('success', () => {
      it('should return the cat details', () => {
        mockCatsService.fetchCatById.mockReturnValueOnce(cat);
        expect(controller.getCatBydId(catId)).toEqual(cat);
        expect(service.fetchCatById).toHaveBeenCalledTimes(1);
      });
    });

    describe('failure', () => {
      let errorMessage;

      it('should throw if no cats found', () => {
        errorMessage = `No cat found with provided id : ${catId}`;
        mockCatsService.fetchCatById.mockImplementation(() => {
          throw new NotFoundException(errorMessage);
        });
        expect(() => controller.getCatBydId(catId)).toThrow(NotFoundException);
        expect(() => controller.getCatBydId(catId)).toThrow(errorMessage);
      });

      it('should throw if no param  passed', () => {
        errorMessage = 'Please provide a valid `id` in Query param';
        mockCatsService.fetchCatById.mockImplementation(() => {
          throw new NotFoundException(errorMessage);
        });

        expect(() => controller.getCatBydId(catId)).toThrow(NotFoundException);
        expect(() => controller.getCatBydId(catId)).toThrow(errorMessage);
      });
    });
  });
});
