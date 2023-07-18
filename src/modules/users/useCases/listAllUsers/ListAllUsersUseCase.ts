import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list()

    const userIsAdmin = users.find(user => user.id === user_id)

    if (!userIsAdmin) {
      throw new Error('Mensagem do erro')
    }

    return users

  }
}

export { ListAllUsersUseCase };
