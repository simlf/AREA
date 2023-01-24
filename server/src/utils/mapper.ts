import { UserDto } from "src/users/dto/user.dto";
import { UserEntity } from "src/users/entity/UserEntity";

export const toUserDto = (data: UserEntity): UserDto => {
    const { id, email, username } = data;
    let userDto: UserDto = { id, email, username };
    return userDto;
};
