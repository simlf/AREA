import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserDetails } from '../utils/types';

@Injectable()
export class CalendarService {
  // This is a repository of the User entity that we can use to query the database
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // This method is used by the serializer to find the user in the database
  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
