async function fetchApi(api: string, headers: {}, method: string = 'GET') {
    return fetch(api, { headers: headers, method: method })
}
async function retryFetch(api: string, headers: {}, interval: number = 0, timeout: number = 0) {
    console.log("in the test package")
    console.debug("in the test package")
    console.debug("in variables sent from cloent side", api, interval, timeout, headers)
    if (interval === 0 && timeout === 0) {
        console.debug("in first if")
        return await fetchApi(api, headers)
    }
    if (interval && !timeout) {
        console.debug("in second if")
        setInterval(async () => { await fetchApi(api, headers) }, interval)
        return
    }
    if (interval > 0 && timeout > 0) {
        console.debug("in third if")
        console.debug('in inverval and timeout')
        let endapi = 0
        setTimeout(() => {
            endapi = 1
        }, timeout)
        console.debug('in inverval and timeout')
        while (endapi === 0) {
            setInterval(async () => { await fetchApi(api, headers) }, interval)
        }
    }
}
export { retryFetch }