import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BcryptService } from 'src/iam/hashing/bcrypt.service';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly bcryptService: BcryptService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = await this.findByEmail(createUserDto.email);

    if (user) {
      throw new UnprocessableEntityException('Email already exists');
    }

    const hashedPassword = await this.bcryptService.hash(
      createUserDto.password,
    );

    createUserDto.password = hashedPassword;

    const createdUser = await this.userModel.create(createUserDto);

    return createdUser;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
}
