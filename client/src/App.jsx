import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CotizadorComponent from './components/CotizadorComponent';
import DataTable from './components/DataTable';

const socket = io.connect('http://localhost:8081');

function App() {
  const [prices, setPrices] = useState([]);

  useEffect(()=>{
    socket.on('send_prices', (data)=>{
      if(data.data){
        setPrices(data.data);
      }
    })
  }, [socket]);

  return (    
    <div className="bg-black w-full min-h-[100vh]">
      <HeaderComponent />

      <div className="h-[70px]"></div>

      <CotizadorComponent prices={prices} />  

      <DataTable />     

      <FooterComponent></FooterComponent>

      {/* <div>
        <input type="text" placeholder='message' />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {data}
      </div>
      <div className='text-3xl font-bold underline'>
        texto
      </div> */}
    </div>
  )
}

export default App
