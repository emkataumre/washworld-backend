import { Test, TestingModule } from '@nestjs/testing';
import { UserMembershipController } from './membership-package-features.controller';
import { UserMembershipService } from './membership-package-features.service';

describe('UserMembershipController', () => {
  let controller: UserMembershipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMembershipController],
      providers: [UserMembershipService],
    }).compile();

    controller = module.get<UserMembershipController>(UserMembershipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
