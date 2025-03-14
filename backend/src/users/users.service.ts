import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { hash, genSalt } from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private async hashPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const createdUser = new this.userModel(createUserDto);
    const result = await createdUser.save();
    return new User(result.toJSON());
  }

  findAll() {
    return plainToInstance(User,this.userModel.find().exec(),{ excludeExtraneousValues: true });
  }

  findOne(id: string) {
    return plainToInstance(User,this.userModel.findById(id).exec(),{ excludeExtraneousValues: true });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, updateUserDto).exec();
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
