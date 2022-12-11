import path from "path"

import { getUsername } from "./modules/username.js"
import { up, cd, ls } from "./modules/navigation.js"
import { cat, add, rn, cp, mv, rm } from "./modules/files.js"
import { os } from "./modules/system.js"
import { hash } from "./modules/crypto.js"
import { compress, decompress } from "./modules/zip.js"
import { exitHandler } from "./modules/exit.js"
import { InputError } from "./modules/errors.js"

const NAVIGATION_COMMANDS_MAP = {
  "up": up,
  "cd": cd,
}

const COMMANDS_MAP = {
  "ls": ls,
  "cat": cat,
  "add": add,
  "rn": rn,
  "cp": cp,
  "mv": mv,
  "rm": rm,
  "os": os,
  "hash": hash,
  "compress": compress,
  "decompress": decompress,
}

const username = getUsername()
let workingDirectory = path.resolve()

process.stdin.on("data", async (data) => {
  const [commandName, ...args] = data.toString().trim().split(" ")
  const commonCommand = COMMANDS_MAP[commandName]
  const navigationCommand = NAVIGATION_COMMANDS_MAP[commandName]

  try {
    if (commandName === ".exit") {
      return exitHandler(username)
    }

    if (!commonCommand && !navigationCommand) {
      throw new InputError()
    }

    if (commonCommand) {
      await commonCommand(workingDirectory, args)
    }

    if (navigationCommand) {
      workingDirectory = await navigationCommand(workingDirectory, args)
    }

    console.log(`You are currently in  ${workingDirectory}` )
  } catch (err) {
    if (err instanceof InputError) {
      return console.log(err.message)
    }

    console.log(`Operation failed: ${err.message}`)
  }
})

process.on('SIGINT', () => exitHandler(username))
