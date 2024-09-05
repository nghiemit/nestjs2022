import { Command, CommandRunner, Option } from 'nest-commander';
import { DataSource, EntityManager } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Logger } from '@nestjs/common';
import { ProfileEntity } from '../entities/profile.entity';
import { faker } from '@faker-js/faker';

@Command({ name: 'init_user', description: 'Initial users' })
export class UserCommand extends CommandRunner {
  //#region constructor
  constructor(
    private readonly __dataSource: DataSource,
    private readonly __configService: ConfigService,
  ) {
    super();
  }
  //#endregion

  @Option({
    flags: '--purge [boolean]',
    description: 'Determine that truncate db or not',
  })
  public async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    console.log('UserCommander running!');
    const adminUsername = this.__configService.get<string>(
      'ADMIN_USERNAME',
      'admin',
    );
    const adminPassword = this.__configService.get<string>(
      'ADMIN_PASSWORD',
      'admin',
    );
    const seedUserAmount = this.__configService.get<number>(
      'SEED__USER_AMOUNT',
      100,
    );
    const seedUserPassword = this.__configService.get<string>(
      'SEED__USER_PASSWORD',
      'secret_password@123',
    );
    if (seedUserAmount >= 10000) {
      throw new BadRequestException('Oops! Amount should be less than 10000!');
    }
    const users = [];
    for (let i = 0; i < seedUserAmount; i++) {
      const profile = new ProfileEntity();
      profile.firstName = faker.person.firstName();
      profile.lastName = faker.person.lastName();

      const newUser = new UserEntity();
      newUser.username = `faker_${faker.internet.userName().toLowerCase()}`;
      newUser.email = faker.internet.email();
      newUser.password = seedUserPassword;
      newUser.hashPasswordBeforeInsert();
      newUser.isAdmin = false;
      newUser.profile = profile;
      users.push(newUser);
    }
    await this.__dataSource.transaction(async (manager: EntityManager) => {
      // save admin user
      const profile = new ProfileEntity();
      profile.firstName = 'admin';
      profile.lastName = 'admin';

      const newUser = new UserEntity();
      newUser.username = adminUsername;
      newUser.email = `${adminUsername}@hotmail.com`;
      newUser.password = adminPassword;
      newUser.hashPasswordBeforeInsert();
      newUser.isAdmin = true;
      newUser.profile = profile;
      await manager.save(newUser);
      await manager.save(users);
    });
    console.log(`UserCommander done!`);
  }
}
