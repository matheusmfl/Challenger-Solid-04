import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User {
    console.log('entrou')
    const user = this.usersRepository.findById(user_id)
    const userAdmin = this.usersRepository.turnAdmin(user)


    userAdmin.admin = true

    return userAdmin
  }
}

export { TurnUserAdminUseCase };
