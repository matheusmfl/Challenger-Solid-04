import { NextFunction, Request, Response } from "express";

import { UserNotExistsError } from "../Errors/UserNotExistsError";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) { }

  handle(request: Request, response: Response, next: NextFunction): Response {
    try {

      const { user_id } = request.params

      this.listAllUsersUseCase.execute({ user_id })

      return response.status(200).send()
    }
    catch (err) {
      if (err instanceof UserNotExistsError) {

        return response.status(400).json({ error: err.message })
      }
      next(err)
    }
    return response.status(200).send()

  }
}

export { ListAllUsersController };
