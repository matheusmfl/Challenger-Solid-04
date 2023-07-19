import { NextFunction, Request, Response } from "express";

import { UserNotExistsError } from "../Errors/UserNotExistsError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) { }

  handle(request: Request, response: Response, next: NextFunction): Response {

    try {
      const { user_id } = request.params
      const user = this.showUserProfileUseCase.execute({ user_id })

      return response.status(200).json(user)
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

export { ShowUserProfileController };
