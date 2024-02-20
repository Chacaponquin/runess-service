import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthController } from './controller/auth.controller';
import { UserMongoRepository } from './infrastructure/mongo';
import { UserRepository } from './services/user-repository';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_MOELS } from 'src/shared/constants';
import { UserSchema } from './infrastructure/mongo/schema';
import { CryptServices } from '@shared/services/crypt.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: DB_MOELS.USERS, useFactory: () => UserSchema }
    ])
  ],
  controllers: [AuthController],
  providers: [UserService, UserMongoRepository, UserRepository, CryptServices]
})
export class UserModule {}
