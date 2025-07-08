import axios from "axios"
async function fetchApi(api: string, init: {}, method: string = 'GET') {
    const response = await axios.get(api, { withCredentials: true }).catch(err => err)
    return response
}

const intervalPromise = (api: string, init: object, interval: number, timeout?: number) => {
    console.log("in the interval promise.................")
    return new Promise((resolve, reject) => {
        let response: any;
        let endapi: boolean = false
        console.log('changes in the main wile through package imptoves')
        if (timeout)
            setTimeout(() => {
                endapi = true
            }, timeout)
        const apiInterval = setInterval(async () => {
            response = await fetchApi(api, init)
            console.log("--------------------------",response)
            if (response?.status === 200 || (timeout && endapi === true)) {
                clearInterval(apiInterval)
                if (response.status===200) resolve(response?.data)
                else reject(response)
                return
            }
        }, interval)
    })
}

async function retryFetch(api: string, init: {}, interval: number = 0, timeout: number = 0) {
    // stage--1 direct api call without interval and timeout
    if (!interval && !timeout) {
        const response = await fetchApi(api, init)
        return response
    }

    // stage--2 run api on failure for the given interval
    if (interval && !timeout) {
        return await intervalPromise(api, init, interval)
    }

    // stage--3 run api on failure for the given interval and till the given timeout
    if (interval && timeout) {
        console.log("in stage -----------------------------3")
        return await intervalPromise(api, init, interval, timeout)
    }
}

export { retryFetch }