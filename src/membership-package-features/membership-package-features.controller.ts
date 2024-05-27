import { Controller, Get } from '@nestjs/common';
import { MembershipPackageFeaturesService } from './membership-package-features.service';

@Controller('membership-package-features')
export class MembershipPackageFeaturesController {
  constructor(
    private readonly membershipPackageFeaturesService: MembershipPackageFeaturesService,
  ) {}

  @Get()
  getMembershipPackageFeatures() {
    return this.membershipPackageFeaturesService.getMembershipPackageFeatures();
  }
}
