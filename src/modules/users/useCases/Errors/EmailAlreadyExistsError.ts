export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('User Already Exists')
  }
}