import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UserNotExistsError } from "../Errors/UserNotExistsError";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list()

    const userIsAdmin = users.find(user => user.id === user_id)


    if (!userIsAdmin) {
      throw new UserNotExistsError
    }

    return users

  }
}

export { ListAllUsersUseCase };
