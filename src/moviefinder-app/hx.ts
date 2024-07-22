import  { Route } from "./route";

export const hxHandlers = new Map<string, (request: Request) => Response>()

export const hx = (route: Route.Route, handler: (request: Request) => Response) => {
    hxHandlers.set(route.routeName, handler)
}

export type Hx = typeof hx

export const isHxRequest = (request: Request) => {
    return request.headers.get("HX-Request") === "true"
}

export const handleRequest = (request: Request) => {
    if(!isHxRequest(request)) {
        return null
    }
    
    const route = Route.toRoute(request.url)
    
    if(!route) {
        return null
    }

    const handler = hxHandlers.get(route.routeName)

    if(!handler) {
        return null
    }

    return handler(request)
}