export class InputError extends Error {
  constructor() {
    super("Invalid input")
    this.name = "InputError"
  } 
}
