var express = require('express')
var cors = require('cors')
const { retryFetch } = require('retryable-fetch-ts')
const { createProxyMiddleware,responseInterceptor } = require('http-proxy-middleware')

var app = express();

const corsOptions = {
    origin: 'https://fictional-orbit-v5gvqp9gx9qhpv7g-3000.app.github.dev',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-type', 'Authorization', 'Access-Control-Allow-Origin'],
    credentials: true
}
// app.use('/artworks', createProxyMiddleware({
//     target: 'https://api.artic.edu/api/v1/artworks',
//     changeOrigin: true,
//     selfHandleResponse: true,
//     on: {
//         proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
//             console.log("in the proxy resp")
//             const location=proxyRes.headers.location
//             console.log('redirect location is',location)
//             const data=await fetch(location).then(res=>res.json()).then(data=>data)
//             console.log(data)
//             proxyRes.pipe(JSON.stringify(data))
//         }),
//     }
// }))
app.use(cors(corsOptions))




app.get('/', (req, res) => {
    console.log('backend works')
    res.send('hello from backend')
})

app.get('/artworks',async (req,res)=>{
    const response=await fetch('https://api.artic.edu/api/v1/artworks').then(resp=>resp?.json()).then(data=>data)
    res.send(response)
})
app.listen(3001, () => {
    console.log('server running on port' + 3001)
})