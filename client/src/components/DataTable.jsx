import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import { LineChart, Line } from 'recharts';
import { CSVLink } from 'react-csv';
import useData from '../helpers/useData';

const socket = io.connect('http://localhost:8081');

const initialState = [
//   {
//     id: 'bitcoin',
//     symbol: 'btc',
//     name: 'Bitcoin',
//     market_data:{
//       current_price: {
//         usd: 8949
//       },
//       market_cap: {usd: 569332979517},
//       price_change_percentage_1h_in_currency: {usd:-1.21278},
//       price_change_percentage_24h_in_currency: {usd: 0.15547},
//       price_change_percentage_7d_in_currency: {usd:-1.2433},
//       price_change_percentage_30d_in_currency: {usd:-6.76599},
//       price_change_percentage_1y_in_currency: {usd:25.81069},
//       total_volume: {usd: 17104278860}
//     },
//     seven_day_trend: [],      
//   },
//   {
//     id: 'ethereum',
//     symbol: 'eth',
//     name: 'Ethereum',
//     market_data:{
//       current_price: {
//         usd: 8949
//       },
//       market_cap: {usd: 569332979517},
//       price_change_percentage_1h_in_currency: {usd: 4.053},
//       price_change_percentage_24h_in_currency: {usd: 0.15547},
//       price_change_percentage_7d_in_currency: {usd:-1.2433},
//       price_change_percentage_30d_in_currency: {usd:-6.76599},
//       price_change_percentage_1y_in_currency: {usd:25.81069},
//       total_volume: {usd: 17104278860}
//     },
//     seven_day_trend: [],
      
//   },
//   {
//     id: 'cardano',
//     symbol: 'ada',
//     name: 'Cardano',
//     market_data:{
//       current_price: {
//         usd: 8949
//       },
//       market_cap: {usd: 569332979517},
//       price_change_percentage_1h_in_currency: {usd:-1.21278},
//       price_change_percentage_24h_in_currency: {usd: 0.15547},
//       price_change_percentage_7d_in_currency: {usd:-1.2433},
//       price_change_percentage_30d_in_currency: {usd:-6.76599},
//       price_change_percentage_1y_in_currency: {usd:25.81069},
//       total_volume: {usd: 17104278860}
//     },
//     seven_day_trend: [],        
//   },
]



const DataTable = () => {

  const [coins, setCoins] = useState(initialState);
  const [report, setReport] = useState({
    filename: 'Report.csv',
    data: [],
    headers: []
  });
  const [items, setItems] = useState([]);

  useEffect(()=>{
    socket.on('send_coins', (data)=>{
      console.log(data);
      setCoins(data);
      
      const { headers, rows } = useData(data);
      setReport({
        ...report,
        headers,
        data: rows
      });
      setItems(rows);
    })    
  
  }, [socket]);

  const formatCurrency = (value, places = 5) => {
    value = Number(value);
    return new Intl.NumberFormat('en-US').format(value.toFixed(places));
  }

  const downloadJSON = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(items)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  }

  return (
    <div id="CotizadorComponent" className="w-full mt-10">
      <div className="max-w-[1200px] mx-auto flex items-center">
        <div className="overflow-x-auto w-full">
          <div className="flex items-center justify-center bg-gray-100 font-sans overflow-x-scroll w-full pt-4">
            <div className="w-full">
              <div className="shadow-md rounded my-2 px-1">
                <div className="my-2 flex justify-end">
                  <span className="mr-4 text-sm rounded-md bg-[#ff9332] p-2 hover:bg-[#FF7800]">
                    <CSVLink {...report}>
                      <span className="flex items-center">
                        <img src="/csv.png" alt="logo csv" className="mr-2" />
                        Exportar a CSV
                      </span>
                    </CSVLink>
                  </span>
                  <span className="mr-4 text-sm rounded-md bg-[#ff9332] p-2 hover:bg-[#FF7800] flex items-center hover:cursor-pointer" onClick={downloadJSON}>
                      <img src="/json.png" alt="logo csv" className="mr-2" />
                      Exportar a JSON
                  </span>
                </div>
                <table className="min-w-max w-full table-auto text-[9px]">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="py-3">#</th>
                      <th className="py-3">ASSET</th>
                      <th className="py-3">PRICE (USD)</th>
                      <th className="py-3">CHANGE VS USD (1H)</th>
                      <th className="py-3">CHANGE VS USD (24H)</th>
                      <th className="py-3">7 DAY TREND</th>
                      <th className="py-3">REPORTED MARKETCAP</th>
                      <th className="py-3">REAL VOLUME (24H)</th>
                      <th className="py-3">CHANGE VS USD (7D)</th>
                      <th className="py-3">CHANGE VS USD (30D)</th>
                      <th className="py-3">CHANGE VS USD (YTD)</th>
                    </tr>
                  </thead>
                    <tbody className="text-gray-600">
                      {
                        coins.map((item, index)=>(
                          <tr className="border-b border-gray-200 hover:bg-gray-100" key={item.id}>
                            <td className="py-3 px-1">
                                <span className="font-bold">
                                    {index+1}
                                </span>
                            </td>
                            <td className="py-3 px-3">
                            <span className="flex items-center">
                                <img src={`/${item.name.toLowerCase()}.png`} alt="icon coin" className="mr-1" />
                                <span className="text-indigo-900 font-bold">
                                    {item.name} 
                                </span>
                                <span  className="text-black font-bold">
                                    - {item.symbol.toUpperCase()}
                                </span>
                            </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className="text-black font-bold">
                                ${formatCurrency(item.market_data.current_price.usd)}      
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className={`font-bold  ${item.market_data.price_change_percentage_1h_in_currency.usd<0 ? "text-red-600" : "text-green-600"}`}>
                                  {`${item.market_data.price_change_percentage_1h_in_currency.usd>0 ? "+" : ""} ${item.market_data.price_change_percentage_1h_in_currency.usd}`}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className={`font-bold  ${item.market_data.price_change_percentage_24h_in_currency.usd<0 ? "text-red-600" : "text-green-600"}`}>
                                  {`${item.market_data.price_change_percentage_24h_in_currency.usd>0 ? "+" : ""} ${item.market_data.price_change_percentage_24h_in_currency.usd}`}
                              </span>
                            </td>                                                
                            <td className="py-3 px-2">
                              <span>
                                <LineChart width={100} height={50} data={[
                                  {valor: item.market_data.price_change_percentage_1y_in_currency.usd}, {valor: item.market_data.price_change_percentage_200d_in_currency.usd}, {valor: item.market_data.price_change_percentage_60d_in_currency.usd},
                                {valor: item.market_data.price_change_percentage_30d_in_currency.usd},{valor: item.market_data.price_change_percentage_14d_in_currency.usd},
                                {valor: item.market_data.price_change_percentage_7d_in_currency.usd},
                                {valor: item.market_data.price_change_percentage_24h_in_currency.usd}]}>
                                  <Line type="monotone" dataKey="valor" stroke="#8884d8" />
                                </LineChart>
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className="text-black font-bold">
                                ${formatCurrency((item.market_data.market_cap.usd/1000000000),2)}B      
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className="text-black font-bold">
                                ${formatCurrency((item.market_data.total_volume.usd/1000000000),2)}B      
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className={`font-bold  ${item.market_data.price_change_percentage_7d_in_currency.usd<0 ? "text-red-600" : "text-green-600"}`}>
                                  {`${item.market_data.price_change_percentage_7d_in_currency.usd>0 ? "+" : ""} ${item.market_data.price_change_percentage_7d_in_currency.usd}`}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className={`font-bold  ${item.market_data.price_change_percentage_30d_in_currency.usd<0 ? "text-red-600" : "text-green-600"}`}>
                                  {`${item.market_data.price_change_percentage_30d_in_currency.usd>0 ? "+" : ""} ${item.market_data.price_change_percentage_30d_in_currency.usd}`}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className={`font-bold  ${item.market_data.price_change_percentage_1y_in_currency.usd<0 ? "text-red-600" : "text-green-600"}`}>
                                  {`${item.market_data.price_change_percentage_1y_in_currency.usd>0 ? "+" : ""} ${item.market_data.price_change_percentage_1y_in_currency.usd}`}
                              </span>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DataTable