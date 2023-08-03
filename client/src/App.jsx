import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CotizadorComponent from './components/CotizadorComponent';
import DataTable from './components/DataTable';

const socket = io.connect('http://localhost:8081');

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(()=>{
    socket.on('send_coins', (data)=>{
      console.log(data);
      setCoins(data);
    })
  }, [socket]);

  return (    
    <div className="bg-black w-full min-h-[100vh]">
      <HeaderComponent />

      <div className="h-[70px]"></div>

      <CotizadorComponent coins={coins} />  

      <DataTable coins={coins} />     

      <FooterComponent></FooterComponent>

    </div>
  )
}

export default App
