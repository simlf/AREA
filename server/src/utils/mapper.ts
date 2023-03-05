import { UserDto } from "src/users/dto/user.dto";
import { UserEntity } from "src/users/entity/UserEntity";

export const toUserDto = (data: UserEntity): UserDto => {
    const { email, id } = data;
    let userDto: UserDto = { email, id };

    return userDto;
};
