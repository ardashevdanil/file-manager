import { access, readdir } from "node:fs/promises"
import { resolve } from "path"

export async function up(workingDirectory) {
  const resolvedPath = resolve(workingDirectory, "../")

  await access(resolvedPath)

  return resolvedPath
}

export async function cd(workingDirectory, path) {
  const resolvedPath = resolve(workingDirectory, path)

  await access(resolvedPath)

  return resolvedPath
}

export async function ls(workingDirectory) {
  const files = await readdir(workingDirectory, { withFileTypes: true })
  const tabularData = files
    .sort((a, b) => Number(a.name > b.name))
    .sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()))
    .map((file) => ({
      name: file.name,
      type: file.isDirectory() ? "directory" : "file",
    }))

  console.table(tabularData)
}
