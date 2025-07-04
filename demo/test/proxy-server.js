var express = require('express')
var cors = require('cors')
const {retryFetch}=require('retryable-fetch-ts')
const { createProxyMiddleware } = require('http-proxy-middleware')

var app = express()
app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://didactic-parakeet-p6grp74gqq5c66gj-3000.app.github.dev');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});




app.get('/', (req, res) => {
    console.log('backend works')
    res.send('hello from backend')
})

app.get('/artworks',async (req,res)=>{
    // const response=await retryFetch('https://api.artic.edu/api/v1/openapi.json',0,0)
    // console.log(response)
    res.send({})
})
app.listen(3001, () => {
    console.log('server running on port' + 3001)
})