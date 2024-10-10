import { Migration } from '@mikro-orm/migrations';

export class Migration20241009205705 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" varchar(255) null, "created_at" timestamptz null, "updated_at" timestamptz null, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in ('admin', 'user')) not null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`create index "user_username_index" on "user" ("username");`);
    this.addSql(`alter table "user" add constraint "user_username_unique" unique ("username");`);
    this.addSql(`create index "user_email_index" on "user" ("email");`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "otp" ("id" varchar(255) null, "created_at" timestamptz null, "updated_at" timestamptz null, "user_id" varchar(255) not null, "code" int not null, "expire_at" timestamptz not null, constraint "otp_pkey" primary key ("id"));`);
    this.addSql(`alter table "otp" add constraint "otp_user_id_unique" unique ("user_id");`);
    this.addSql(`create index "otp_code_index" on "otp" ("code");`);

    this.addSql(`alter table "otp" add constraint "otp_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

}
