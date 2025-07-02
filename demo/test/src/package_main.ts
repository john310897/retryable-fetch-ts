async function fetchApi(api: string, init: {}, method: string = 'GET') {
    console.debug('in direct api call+++++++++++++++++++++++++++++++++++++++++')
    const response = await fetch(api,init)
    console.debug(response?.json())
    return response
}

const intervalPromise = (api: string, init: object, interval: number, timeout?: number) => {
    return new Promise((resolve, reject) => {
        let response: any;
        let endapi: boolean = false
        if (timeout)
            setTimeout(() => {
                endapi = true
            }, timeout)
        const apiInterval = setInterval(async () => {
            response = await fetchApi(api, init)
            if (response?.ok || (timeout && endapi)) {
                clearInterval(apiInterval)
                if (response.ok) resolve(response)
                else reject(response)
                return
            }
        }, interval)
    })
}

async function retryFetch(api: string, init: {}, interval: number = 0, timeout: number = 0) {
    // stage--1 direct api call without interval and timeout
    console.debug('in retry fetch internal test package')
    if (!interval && !timeout) {
        console.debug("stage--1 direct api call")
        return await fetchApi(api, init)
    }

    // stage--2 run api on failure for the given interval
    if (interval && !timeout) {
        console.debug('stage--2 run api on failure for the given interval')
        return await intervalPromise(api, init, interval)
    }

    // stage--3 run api on failure for the given interval and till the given timeout
    if (interval && timeout) {
        console.debug('stage--3 run api on failure for the given interval and till the given timeout')
        return await intervalPromise(api, init, interval, timeout)

    }
}
export { retryFetch }