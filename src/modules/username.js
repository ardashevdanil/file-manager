export function getUsername() {
  const username = process.argv.reduce((acc, arg) => {
    if (arg.indexOf("--username=") === 0) {
      return arg.split("=").slice(-1)[0]
    } else {
      return acc
    }
  }, "")

  if (username) {
    console.log(`Welcome to the File Manager, ${username}!`)
    return username
  } else {
    throw new Error("Provide username")
  }
}
