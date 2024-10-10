import { faker } from '@faker-js/faker';
import { PrimaryKey, Property } from '@mikro-orm/postgresql';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

export abstract class BaseEntity {
  @ApiProperty({
    description: 'Id',
    example: faker.string.uuid(),
    type: String,
  })
  @PrimaryKey()
  id? = v4();

  @ApiProperty({
    description: 'Creation document date',
    example: new Date(),
  })
  @Property({ type: Date })
  createdAt?: Date = new Date();

  @ApiProperty({
    description: 'Updated document date',
    example: new Date(),
  })
  @Property({ type: Date, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
