import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return new this.userModel(createUserDto).save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(username: string) {
    return this.userModel.findOne({ username });
  }

  // update(username: string, updateUserDto: UpdateUserDto) {
  //   return this.userModel.updateOne({ username }, { $set: updateUserDto })
  // }

  // remove(username: string) {
  //   return this.userModel.deleteOne({ username })
  // }
}
