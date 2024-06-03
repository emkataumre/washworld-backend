import { PartialType } from '@nestjs/mapped-types';
import { CreateSelfwashDto } from './create-selfwash.dto';

export class UpdateSelfwashDto extends PartialType(CreateSelfwashDto) {}
