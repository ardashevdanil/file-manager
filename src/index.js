import path from "path"

import { getUsername } from "./modules/username.js"
import { up, cd, ls } from "./modules/navigation.js"

const NAVIGATION_COMMANDS_MAP = {
  "up": up,
  "cd": cd,
}

const COMMANDS_MAP = {
  "ls": ls,
  "cat": () => "cat",
  "rn": () => "rn",
  "cp": () => "cp",
  "mv": () => "mv",
  "rm": () => "rm",
  "os": () => "os",
  "hash": () => "hash",
  "compress": () => "compress",
  "decompress": () => "decompress",
}

const username = getUsername()
let workingDirectory = path.resolve()

process.stdin.on("data", async (data) => {
  const [commandName, args] = data.toString().trim().split(" ")
  const commonCommand = COMMANDS_MAP[commandName]
  const navigationCommand = NAVIGATION_COMMANDS_MAP[commandName]

  try {
    if (commonCommand) {
      await commonCommand(workingDirectory, args)
    }

    if (navigationCommand) {
      workingDirectory = await navigationCommand(workingDirectory, args)
    }

    console.log("You are currently in " + workingDirectory )
  } catch (err) {
    console.log(`Operation failed: ${err.message}`)
  }
})
