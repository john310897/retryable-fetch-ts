async function fetchApi(api: string, headers: {}, method: string = 'GET') {
    return fetch(api, { headers: headers, method: method })
}
async function retryFetch(api: string, headers: {}, interval: number = 0, timeout: number = 0) {
    if (interval === 0 && timeout === 0) {
        return await fetchApi(api, headers)
    }
    if (interval && !timeout) {
        setInterval(async () => { await fetchApi(api, headers) }, interval)
    }
    if (interval && timeout) {
        let endapi = 0
        setTimeout(() => {
            endapi = 1
        }, timeout)
        while (endapi) {
            setInterval(async () => { await fetchApi(api, headers) }, interval)
        }
    }
}
export { retryFetch }