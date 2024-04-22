const http = {
    get: (url: string) => fetch(url, {
        method: 'GET',
        headers: {
            "x-auth": localStorage.getItem("x-auth") || "",
            'Access-Control-Allow-Origin': window.location.origin
        }
    }),
    post: (url: string, body: any) => fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "x-auth": localStorage.getItem("x-auth") || "",
            'Access-Control-Allow-Origin': window.location.origin
        },
        body: JSON.stringify(body)
    }),
    put: (url: string, body: any) => fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "x-auth": localStorage.getItem("x-auth") || "",
            'Access-Control-Allow-Origin': window.location.origin
        },
        body: JSON.stringify(body)
    }),
    delete: (url: string) => fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "x-auth": localStorage.getItem("x-auth") || "",
            'Access-Control-Allow-Origin': window.location.origin
        }
    }),
}


export default http;