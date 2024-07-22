export const html = (content: string) => {
    return new Response(content, {
        headers: {
            "Content-Type": "text/html",
        },
    })
}
