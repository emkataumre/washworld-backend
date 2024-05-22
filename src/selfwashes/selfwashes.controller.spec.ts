import { Test, TestingModule } from '@nestjs/testing';
import { SelfwashesController } from './selfwashes.controller';
import { SelfwashesService } from './selfwashes.service';

describe('SelfwashesController', () => {
  let controller: SelfwashesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelfwashesController],
      providers: [SelfwashesService],
    }).compile();

    controller = module.get<SelfwashesController>(SelfwashesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
