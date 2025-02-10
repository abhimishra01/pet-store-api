import { Test, TestingModule } from '@nestjs/testing';
import { CatsControllerService } from './cats.controller.service';

describe('CatsControllerService', () => {
  let service: CatsControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsControllerService],
    }).compile();

    service = module.get<CatsControllerService>(CatsControllerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
