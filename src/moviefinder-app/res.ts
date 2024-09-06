


export type Res = {
    type: "html"
    html: string
} | {
    type: "redirect"
}

export const html = (html: string): Res => {
    return {
        type: "html",
        html
    }
}

export const redirect = (): Res => {
    return {
        type: "redirect"
    }
}