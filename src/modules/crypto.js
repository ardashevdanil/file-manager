import { readFile } from 'node:fs/promises'
import { createHash } from "node:crypto"
import { resolve } from "path"

import { InputError } from "./errors.js"

export async function hash(workingDirectory, args) {
  const path = args[0]

  if (!path) {
    throw new InputError()
  }

  const result = createHash('sha256')
    .update(await readFile(resolve(workingDirectory, path)))
    .digest("hex")

  console.log(result)
}
