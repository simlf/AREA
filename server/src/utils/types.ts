import { UserDto } from "src/users/dto/user.dto";
import { UserEntity } from "src/users/entity/UserEntity";

export type Done = (err: Error, user: UserDto) => void;
