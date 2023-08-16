export const url = (
  path: string,
  origin = 'http://185.46.8.130/api/'
) => {
  console.log('path ' + path)
  console.log('created ' + new URL(path, origin))
  const created = new URL(path, origin)
  return created
}
