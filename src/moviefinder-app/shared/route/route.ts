export const Route = <TRouteName extends string>(routeName: TRouteName) => {
    const builder = () => {
        return {
            routeName,
        } as const
    }
    builder.routeName = routeName
    return builder
}

export type Route = ReturnType<ReturnType<typeof Route>>


export type EncodedRoute = string & {
    EncodedRoute: never
}

export const encode = (route: Route): EncodedRoute => {
    const base64 = btoa(JSON.stringify(route))
    const addedSlash = base64[0] === '/' ? base64 : `/${base64}`
    return addedSlash as EncodedRoute
}

export const decode = (encodedRoute: EncodedRoute): Route | null => {
    try {
        const removedSlash = encodedRoute[0] === '/' ? encodedRoute.slice(1) : encodedRoute
        return JSON.parse(atob(removedSlash)) as Route
    } catch(error) {
        return null
    }
}

export const toEncodedRoute = (urlString: string): EncodedRoute => {
    const url = new URL(urlString)
    const pathname = url.pathname
    return pathname as EncodedRoute
}

export const toRoute = (urlString: string): Route | null => {
    const encodedRoute = toEncodedRoute(urlString)
    const decoded = decode(encodedRoute)
    return decoded
}
