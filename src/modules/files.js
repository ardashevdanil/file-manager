import { createReadStream, createWriteStream } from "node:fs"
import { appendFile, rm as fsRm, rename } from "node:fs/promises"
import { resolve } from "path"

import { InputError } from "./errors.js"

export function cat(workingDirectory, args) {
  const path = args[0]

  if (!path) {
    throw new InputError()
  }

  const readStream = createReadStream(resolve(workingDirectory, path))

  return new Promise((resolve, reject) => {
    readStream
      .on("data", data => process.stdout.write(data))
      .on("end", resolve)
      .on("error", reject)
  })
};

export async function add(workingDirectory, args) {
  const path = args[0]

  if (!path) {
    throw new InputError()
  }

  await appendFile(resolve(workingDirectory, path), "")
}

export async function rn(workingDirectory, args) {
  if (args.length !== 2) {
    throw new InputError()
  }

  const [path, newName] = args

  await rename(
    resolve(workingDirectory, path),
    resolve(workingDirectory, newName),
  )
}

export function cp(workingDirectory, args) {
  if (args.length !== 2) {
    throw new InputError()
  }

  const [path, newPath] = args
  const readStream = createReadStream(resolve(workingDirectory, path))
  const writeStream = createWriteStream(resolve(workingDirectory, newPath, path))

  return new Promise((resolve, reject) => {
    readStream
      .on("data", data => writeStream.write(data))
      .on("end", resolve)
      .on("error", reject)
  })
}

export async function rm(workingDirectory, args) {
  const path = args[0]

  if (!path) {
    throw new InputError()
  }

  await fsRm(resolve(workingDirectory, path))
}

export async function mv(workingDirectory, args) {
  if (args.length !== 2) {
    throw new InputError()
  }

  await cp(workingDirectory, args)
  await rm(workingDirectory, args)
}
