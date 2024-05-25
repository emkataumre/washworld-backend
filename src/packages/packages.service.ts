import { Injectable } from '@nestjs/common';

@Injectable()
export class PackagesService {
  findAll() {
    return `This action returns all packages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} package`;
  }
}
