export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid email or password");
  }
}

export class UserInactiveError extends Error {
  constructor() {
    super("User is inactive");
  }
}
