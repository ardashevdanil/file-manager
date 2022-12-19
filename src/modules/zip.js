import { createBrotliCompress, createBrotliDecompress } from "node:zlib"
import { pipeline } from "node:stream"
import { createReadStream, createWriteStream } from "node:fs"
import { resolve } from "path"

import { InputError } from "./errors.js"

export async function compress(workingDirectory, args) {
  if (args.length !== 2) {
    throw new InputError()
  }

  const [file, archive] = args
  const brotliCompress = createBrotliCompress()
  const source = createReadStream(resolve(workingDirectory, file))
  const destination = createWriteStream(resolve(workingDirectory, archive))

  pipeline(
    source,
    brotliCompress,
    destination,
    (err) => { if (err) throw err }
  )
};

export function decompress (workingDirectory, args) {
  if (args.length !== 2) {
    throw new InputError()
  }

  const [archive, file] = args
  const brotliDecompress = createBrotliDecompress()
  const source = createReadStream(resolve(workingDirectory, archive))
  const destination = createWriteStream(resolve(workingDirectory, file))

  pipeline(
    source,
    brotliDecompress,
    destination,
    (err) => { if (err) throw err }
  )
};
