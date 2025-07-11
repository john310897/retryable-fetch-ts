const express = require('express')
const cors = require('cors')

var app = express();

const corsOptions = {
    origin: 'https://john310897.github.io/retryable-fetch-ts',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-type', 'Authorization', 'Access-Control-Allow-Origin'],
    credentials: true
}

app.use(cors(corsOptions))

// default backend API for testing
app.get('/', (req, res) => {
    console.log('backend works')
    res.send('hello from backend')
})

// calling external API through internal set up
app.get('/artworks',async (req,res)=>{
    const response=await fetch('https://api.artic.edu/api/v1/artworks').then(resp=>resp?.json()).then(data=>data)
    res.send(response)
})

// api call FAILURE
app.get('/failure_api',(req,res)=>{
   res.status(500).send("something worng")
})

// node express server listening at port 3001
app.listen(3001, () => {
    console.log("new server changes detected")
    console.log('server running on port' + 3001) 
})