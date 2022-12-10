import path from "path"

import { getUsername } from "./modules/username.js"

const NAVIGATION_COMMANDS_MAP = {
  "up": () => "up",
  "cd": () => "cd",
}

const COMMANDS_MAP = {
  "ls": () => "ls",
  "ls": () => "ls",
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

process.stdin.on("data", (data) => {
  const commandName = data.toString().trim().split(" ")[0]
  const command = COMMANDS_MAP[commandName] || NAVIGATION_COMMANDS_MAP[commandName]
  let output = "Invalid input"

  if (command) {
    output = command(data.toString(), workingDirectory)
  }

  process.stdout.write(output + "\n" + "You are currently in " + workingDirectory + "\n")
})
