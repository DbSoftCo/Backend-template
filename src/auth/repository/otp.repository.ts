import { EntityRepository } from '@mikro-orm/postgresql';
import { Otp } from '../entities/otp.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpRepository extends EntityRepository<Otp> {}
