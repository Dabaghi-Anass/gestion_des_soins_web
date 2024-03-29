const http = {
    get: (url: string) => fetch(url, {
        method: 'GET',
        headers: {
            "x-auth": localStorage.getItem("x-auth") || ""
        }
    }),
    post: (url: string, body: any) => fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "x-auth": localStorage.getItem("x-auth") || ""
        },
        body: JSON.stringify(body)
    }),
    put: (url: string, body: any) => fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "x-auth": localStorage.getItem("x-auth") || ""
        },
        body: JSON.stringify(body)
    }).then(res => res.json()),
    delete: (url: string) => fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "x-auth": localStorage.getItem("x-auth") || ""
        }
    }),
}


export default http;