import { cpus, EOL, homedir, userInfo, arch } from "node:os"

import { InputError } from "./errors.js"

export function os(_workingDirectory, args) {
  const command = args[0]

  switch (command) {
    case "--EOL":
      console.log(EOL)
      break;
    case "--cpus":
      console.log(cpus())
      break;
    case "--homedir":
      console.log(homedir())
      break;
    case "--username":
      console.log(userInfo().username)
      break;
    case "--architecture":
      console.log(arch())
      break;
    default:
      throw new InputError()
  }
}
