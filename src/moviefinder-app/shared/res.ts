import { Route } from "./route"

export const html = (content: string) => {
    return new Response(content, {
        headers: {
            "Content-Type": "text/html",
        },
    })
}


export const redirect = (route: Route.Route) => {
    const encodedRoute = Route.encode(route)
    return new Response(null, {
        status: 302,
        headers: {
            "Location": encodedRoute,
        },
    })
}