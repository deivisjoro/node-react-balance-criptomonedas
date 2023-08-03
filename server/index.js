const express    = require('express');
const http       = require('http');
const https      = require('https');
const axios      = require('axios');
const { Server } = require('socket.io');
const cors       = require('cors');

const port   = 8081;
const app    = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET']
    }
})

let request = false;  
let i = 0;  

call_api = async () => {
    if(!request){
        i++;
        request = true;

        const [resp1, resp2, resp3] = await Promise.all([
            axios.get("https://api.coingecko.com/api/v3/coins/bitcoin?sparkline=true"),
            axios.get("https://api.coingecko.com/api/v3/coins/ethereum?sparkline=true"),
            axios.get("https://api.coingecko.com/api/v3/coins/cardano?sparkline=true")
        ])
        request = false;

        const data = [
            resp1.data,
            resp2.data,
            resp3.data
        ]

        io.emit('send_coins', data);    
        console.log('Send data.. '+i)   
        
    }
}

let interval = 20;
setInterval(()=>{
    call_api();  
}, (interval * 1000));

io.on('connection', (socket)=>{
    call_api(); 
})

server.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`);
})
