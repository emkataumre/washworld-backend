import { Injectable } from '@nestjs/common';
import { MembershipsService } from 'src/memberships/memberships.service';
import { PackagesService } from 'src/packages/packages.service';
import { FeaturesService } from 'src/features/features.service';

@Injectable()
export class MembershipPackageFeaturesService {
  constructor(
    private membershipsService: MembershipsService,
    private packagesService: PackagesService,
    private featuresService: FeaturesService,
  ) {}

  async getMembershipPackageFeatures() {
    const memberships = await this.membershipsService.findAll();
    const membershipsWithPackages = await Promise.all(
      memberships.map(async (membership) => {
        const _package = await this.packagesService.findOneForMembership(
          membership.membership_id,
        );
        const features = await this.featuresService.findAllForPackage(
          _package.package_id,
        );
        return { ...membership, package: { ..._package, features } };
      }),
    );

    return membershipsWithPackages;
  }
}
