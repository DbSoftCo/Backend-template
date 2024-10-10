import { IsNumber } from 'class-validator';
import {
  Entity,
  EntityRepositoryType,
  OneToOne,
  Property,
} from '@mikro-orm/postgresql';
import { OtpRepository } from '../repository/otp.repository';
import { BaseEntity } from '@src/common/entities/base.entity';
import { User } from '@src/users/entities/user.entity';

@Entity({ repository: () => OtpRepository })
export class Otp extends BaseEntity {
  [EntityRepositoryType]?: OtpRepository;

  @OneToOne(() => User)
  user: User;

  @Property({ index: true })
  @IsNumber()
  code: number;

  @Property({ hidden: true })
  expireAt: Date;

  constructor(userId: User, code: number, expireAt: Date) {
    super();
    this.user = userId;
    this.code = code;
    this.expireAt = expireAt;
  }
}
