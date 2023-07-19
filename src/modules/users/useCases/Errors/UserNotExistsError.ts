export class UserNotExistsError extends Error {
  constructor() {
    super('User does not exist')
  }
}