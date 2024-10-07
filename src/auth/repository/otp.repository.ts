import { EntityRepository } from '@mikro-orm/postgresql';
import { Otp } from '../entities/otp.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OptRepository extends EntityRepository<Otp> {}
