import { Route, toRoute } from "./route/route"

export const hxHandlers = new Map<string, (request: Request) => (Response | Promise<Response>)>()

export const hx = (route: Route, handler: (request: Request) => (Promise<Response> | Response)) => {
    hxHandlers.set(route.routeName, handler)
}

export type Hx = typeof hx

export const isHxRequest = (request: Request) => {
    return request.headers.get("HX-Request") === "true"
}


export const handleRequest = async (request: Request) => {
    if(!isHxRequest(request)) {
        return null
    }
    
    const route = toRoute(request.url)
    
    if(!route) {
        return null
    }

    console.log(route)

    const handler = hxHandlers.get(route.routeName)

    if(!handler) {
        return null
    }

    return handler(request)
}