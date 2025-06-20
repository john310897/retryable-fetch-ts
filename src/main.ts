function fetchApi(api: string, headers: {}, method: string = 'GET') {
    return fetch(api, { headers: headers, method: method })
}
function retryFetch(api: string, headers: {}, interval: number = 0, timeout: number = 0) {
    if (interval === 0 && timeout === 0) {
        return fetchApi(api, headers)
    }
    if (interval && !timeout) {
        setInterval(() => { fetchApi(api, headers) }, interval)
    }
    if (interval && timeout) {
        let endapi = 0
        setTimeout(() => {
            endapi = 1
        }, timeout)
        while (endapi) {
            setInterval(() => { fetchApi(api, headers) }, interval)
        }
    }
}
export { retryFetch }