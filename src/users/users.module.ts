import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptService } from 'src/iam/hashing/bcrypt.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, BcryptService],
  exports: [UsersService],
})
export class UsersModule {}
