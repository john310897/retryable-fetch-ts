var express = require('express')
var cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

var app = express()

app.use(cors({
    origin: 'https://scaling-space-goldfish-gp5q7xj5g76f9p9w-3000.app.github.dev',
    credentials: true
}))

app.use('/artworks1', createProxyMiddleware({
    target: 'https://api.artic.edu/api/v1',
    changeOrigin: true,
    secure: true,
    followRedirects: true
}))

app.get('/', (req, res) => {
    console.log('backend works')
    res.send('hello from backend')
})

app.get('/artworks', async (req, res) => {

    try {
        const response = await fetch('https://api.artic.edu/api/v1/openapi.json',{method:'GET'}).then(res=>res?.json()).then(data=>{
           console.log(data)
            res.send(data)
        })
    } catch (error) {
        console.error('Error fetching from API:', error.message);
        res.status(500).send('Proxy error');
    }

})
app.listen(3001, () => {
    console.log('server running on port' + 3001)
})