import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { Model } from "mongoose";
import { User } from "src/typeorm/entities/User";
// import { User, UserDocument, UserSchema } from '../users/schemas/user.schema';
import { UserDetails } from "src/utils/types";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository:
        Repository<User>,
    ) {}

    validateUser(details: UserDetails) {
        console.log('AuthService.validateUser()');
        console.log(details);
        // return this.userRepository.findOne()
    }
}
