
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
        methods: ['GET', 'POST']
    }
})

let request = false;  
let request_api2 = false;
let i = 0;  

const call_api = ()=>{
    if(!request){
        i++;
        request = true;
        
        https
        .request({
            host: "data.messari.io",
            path: "/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd",
            headers: { "x-messari-api-key": "N-sc5nfqW8pdXHYDpxzMSfJhnxm6vhfs8uMglw63LEgEFNRU" },
        },
        function (response) {
            let str = "";
            response.on("data", (chunk) => (str += chunk));
            response.on("end", () => {
                request = false;
                data = JSON.parse(str);
                data = {
                    data: [
                        {
                            symbol: 'BTC',
                            metrics: {
                                market_data: {
                                    price_usd: 29393.40
                                }
                            }
                        },
                        {
                            symbol: 'ETH',
                            metrics: {
                                market_data: {
                                    price_usd: 1844.48
                                }
                            }
                        },
                        {
                            symbol: 'ADA',
                            metrics: {
                                market_data: {
                                    price_usd: 0.3046
                                }
                            }
                        }
                    ]
                }
                console.log('send prices '+i+' '+data)
                io.emit('send_prices', data);
            });
        })
        .end();
    }
}

call_api();

search_data_by_table = async() => {
    if(!request_api2){
        i++;
        request_api2 = true;

        const [resp1, resp2, resp3] = await Promise.all([
            axios.get("https://api.coingecko.com/api/v3/coins/bitcoin"),
            axios.get("https://api.coingecko.com/api/v3/coins/ethereum"),
            axios.get("https://api.coingecko.com/api/v3/coins/cardano")
        ])
        request_api2 = false;
        
        const data = [
            resp1.data,
            resp2.data,
            resp3.data
        ]

        io.emit('send_coins', data);
        
        // https
        // .request({
        //     host: "api.coingecko.com",
        //     path: `/api/v3/coins/bitcoin`
        // },
        // function (response) {
        //     let str = "";
        //     response.on("data", (chunk) => (str += chunk));
        //     response.on("end", () => {
        //         request_api2 = false;
        //         data = JSON.parse(str);  
        //         io.emit('send_coins', data);
        //     });
        // })
        // .end();
        
        // https
        // .request({
        //     host: "api.coingecko.com",
        //     path: `/api/v3/coins/ethereum`
        // },
        // function (response) {
        //     let str = "";
        //     response.on("data", (chunk) => (str += chunk));
        //     response.on("end", () => {
        //         request_api2 = false;
        //         data = JSON.parse(str);   
        //         io.emit('send_coins', data);
        //     });
        // })
        // .end();
        
        // https
        // .request({
        //     host: "api.coingecko.com",
        //     path: `/api/v3/coins/cardano`
        // },
        // function (response) {
        //     let str = "";
        //     response.on("data", (chunk) => (str += chunk));
        //     response.on("end", () => {
        //         request_api2 = false;
        //         data = JSON.parse(str); 
        //         io.emit('send_coins', data);
        //     });
        // })
        // .end();
    }
}

setInterval(()=>{
    call_api();  
}, 2000);

search_data_by_table(); 
setInterval(()=>{
    search_data_by_table();  
}, 20000);

// io.on('connection', (socket)=>{
//     search_data_by_table(); 
// })
// setInterval(()=>{
//     search_data_by_table('ethereum');  
// }, 5000);
// setInterval(()=>{
//     search_data_by_table('cardano');  
// }, 5000);

// io.on('connection', (socket)=>{

//     let request = false;  
//     let i = 0;  

//     setInterval(()=>{
//         if(!request){
//             i++;
//             request = true;
//             https
//             .request({
//                 host: "data.messari.io",
//                 path: "/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd",
//                 headers: { "x-messari-api-key": "RhcInUCV-0X6UwnH0Oe6t8AWl+4dIz4+EnJjAI7xVS6B4JU9" },
//             },
//             function (response) {
//                 let str = "";
//                 response.on("data", (chunk) => (str += chunk));
//                 response.on("end", () => {
//                     request = false;
//                     data = JSON.parse(str);
//                     console.log('send prices '+i)
//                     socket.broadcast.emit('send_prices', data);
//                 });
//             })
//             .end();
//         }
        
//     }, 2000);
// })

server.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`);
})
