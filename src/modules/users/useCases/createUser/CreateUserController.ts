import { Response, Request, NextFunction } from "express";


import { EmailAlreadyExistsError } from "../Errors/EmailAlreadyExistsError";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  handle(request: Request, response: Response, next: NextFunction): Response {
    try {

      const { name, email } = request.body
      const user = this.createUserUseCase.execute({ name, email })

      return response.status(201).json(user)
    }
    catch (err) {
      if (err instanceof EmailAlreadyExistsError) {
        return response.status(400).send(err.message)
      }
      next(err)
    }

    return response.status(200).send()

  }
}

export { CreateUserController };
