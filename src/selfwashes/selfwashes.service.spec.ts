import { Test, TestingModule } from '@nestjs/testing';
import { SelfwashesService } from './selfwashes.service';

describe('SelfwashesService', () => {
  let service: SelfwashesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelfwashesService],
    }).compile();

    service = module.get<SelfwashesService>(SelfwashesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
