export const parseCharacters = (value: string) =>
  value
    .match(/(\{.*?\})/g)
    ?.map((match) => JSON.parse(match))
    ?.filter((value) => value.status === 'content')
    ?.map((value) => value.value)
    ?.join('')
