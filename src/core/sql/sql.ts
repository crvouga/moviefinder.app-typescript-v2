export type VarTypePrimitive = number | string | boolean | null | undefined

export type VarTypeJson = {
  t: 'json'
  json: string
}

export const json = <T>(value: T): VarTypeJson => ({
  t: 'json',
  json: JSON.stringify(value)
})

export type VarTypeCommas = {
  t: 'commas'
  values: (string | number)[]
}

export const commas = (values: (string | number)[]): VarTypeCommas => ({
  t: 'commas',
  values
})

export type VarType = VarTypePrimitive | VarTypeJson | VarTypeCommas

export type Vars = {
  [key: string]: VarType
}

export const pagination = (input: { limit?: number; offset?: number }) => {
  let str = ''

  if (input.limit) {
    str += `LIMIT\t${input.limit}\n`
  }

  if (input.offset) {
    str += `OFFSET\t${input.offset}\n`
  }
  return {
    str,
    vars: {
      limit: input.limit,
      offset: input.offset
    }
  }
}

export const to = (query: string, variables: Vars): string => {
  const keys = Object.keys(variables)
  keys.sort((a, b) => b.length - a.length)
  let replaced = query
  for (const key of keys) {
    replaced = replaceParam(replaced, key, variables[key])
  }
  return replaced
}

const replaceParam = (query: string, variable: string, value: VarType): string => {
  switch (typeof value) {
    case 'number':
    case 'bigint':
    case 'boolean': {
      const replaced = query.replace(new RegExp(`:${variable}`, 'g'), `${value}`)
      return replaced
    }
    case 'object': {
      switch (value?.t) {
        case 'commas': {
          const commasStr = value.values
            .map((v) => {
              switch (typeof v) {
                case 'string': {
                  return `'${v}'`
                }
                default: {
                  return `${v}`
                }
              }
            })
            .join(', ')

          const replaced = query.replace(new RegExp(`:${variable}`, 'g'), commasStr)

          return replaced
        }

        case 'json': {
          const jsonString = value.json
          const escapedJsonString = jsonString.replace(/'/g, "''")

          const replaced = query.replace(new RegExp(`:${variable}`, 'g'), `'${escapedJsonString}'`)

          return replaced
        }
        default: {
          const replaced = query.replace(new RegExp(`:${variable}`, 'g'), 'NULL')

          return replaced
        }
      }
    }
    case 'undefined':
      return query.replace(new RegExp(`:${variable}`, 'g'), 'NULL')
    case 'string': {
      const escapedValue = value.replace(/'/g, "''")
      return query.replace(new RegExp(`:${variable}`, 'g'), `'${escapedValue}'`)
    }
    case 'function':
    case 'symbol': {
      return query
    }
    default: {
      return query
    }
  }
}

export const toLog = (query: string, params: Vars): string => {
  const keys = Object.keys(params)
  keys.sort((a, b) => b.length - a.length)
  let replaced = query
  for (const key of keys) {
    replaced = replaceParamLog(replaced, key, params[key])
  }
  return replaced
}

const replaceParamLog = (query: string, key: string, value: VarType): string => {
  switch (typeof value) {
    case 'object': {
      return query
    }
    default: {
      return replaceParam(query, key, value)
    }
  }
}
