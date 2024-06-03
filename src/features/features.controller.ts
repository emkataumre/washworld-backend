import { Controller, Get, Param } from '@nestjs/common';
import { FeaturesService } from './features.service';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get(':package_id')
  findAllForPackage(@Param('package_id') package_id: number) {
    return this.featuresService.findAllForPackage(package_id);
  }
  @Get(':packge_id/:feature_id')
  findOneForPackge(
    @Param('id') packge_id: number,
    @Param('feature_id') feature_id: number,
  ) {
    return this.featuresService.findOneForPackge(packge_id, feature_id);
  }
}
