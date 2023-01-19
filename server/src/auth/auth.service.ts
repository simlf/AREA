import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserDetails } from '../utils/types';

@Injectable()
export class AuthService {
  // This is a repository of the User entity that we can use to query the database
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user if it doesn't exist, otherwise return the existing user
  async validateUser(details: UserDetails) {
    console.log('AuthService');
    console.log(details);
    const user = await this.userRepository.findOneBy({ email: details.email });
    console.log(user);
    if (user) return user;
    console.log('User not found. Creating...');
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }

  // This method is used by the serializer to find the user in the database
  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  // async getAccesToken(: string) {
}
