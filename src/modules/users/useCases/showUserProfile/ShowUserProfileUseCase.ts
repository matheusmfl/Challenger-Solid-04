import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UserNotExistsError } from "../Errors/UserNotExistsError";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id)

    if (!user) {
      throw new UserNotExistsError
    }



    return user
  }
}

export { ShowUserProfileUseCase };
