import { useEffect, useState } from 'react';

const initialState = {
  btc: {
    amount: 0,
    change: 0,
    total: 0
  },
  etc: {
    amount: 0,
    change: 0,
    total: 0
  },
  ada: {
    amount: 0,
    change: 0,
    total: 0
  }
}

const CotizadorComponent = ({prices}) => {

  const [inversion, setInvesion] = useState(0);

  const [priceBitcoin, setPriceBitcoin] = useState('cargando...');
  const [qtyBitcoin, setQtyBitcoin] = useState(0);

  const [priceEthereum, setPriceEthereum] = useState('cargando...');
  const [qtyEthereum, setQtyEthereum] = useState(0);

  const [priceCardano, setPriceCardano] = useState('cargando...');
  const [qtyCardano, setQtyCardano] = useState(0);

  const [months, setMonths] = useState(12);

  const [revenue, setRevenue] = useState({
    ...initialState
  })

  useEffect(()=>{
    if(prices.length>0){
      
      let element = prices.find(item=>item.symbol=='BTC');
      const price_btc = element.metrics.market_data.price_usd; 
      setPriceBitcoin(price_btc);

      element = prices.find(item=>item.symbol=='ETH');
      const price_eth = element.metrics.market_data.price_usd; 
      setPriceEthereum(price_eth);

      element = prices.find(item=>item.symbol=='ADA');
      const price_ada = element.metrics.market_data.price_usd; 
      setPriceCardano(price_ada);
    }
  }, [prices])

  useEffect(()=>{    
    if(!isNaN(inversion) && inversion>0){
      const bitcoins = inversion / priceBitcoin;
      setQtyBitcoin(bitcoins.toFixed(6));

      const ethereums = inversion / priceEthereum;
      setQtyEthereum(ethereums.toFixed(6));

      const cardanos = inversion / priceCardano;
      setQtyCardano(cardanos.toFixed(6));
      setRevenue({
        btc: {
          amount: inversion * 0.050 * months,
          total: parseFloat(inversion) + (inversion * 0.050 * months),
          change: (parseFloat(inversion) + (inversion * 0.050 * months)) / priceBitcoin
        },
        etc: {
          amount: inversion * 0.042 * months,
          total: parseFloat(inversion) + (inversion * 0.042 * months),
          change: (parseFloat(inversion) + (inversion * 0.042 * months)) / priceEthereum
        },
        ada: {
          amount: inversion * 0.010 * months,
          total: parseFloat(inversion) + (inversion * 0.010 * months),
          change: (parseFloat(inversion) + (inversion * 0.010 * months)) / priceCardano
        }
      })
    }
    else{
      setQtyBitcoin(0);
      setQtyEthereum(0);
      setQtyCardano(0);
      setRevenue({...initialState});
    }
    
  }, [inversion, months])

  const hadleChange = (e) => {
    setInvesion(e.target.value);
  }

  const formatCurrency = (value) => {
    value = Number(value);
    return new Intl.NumberFormat('en-US').format(value.toFixed(5));
  }

  const formatCurrencyWithOutFixed = (value) => {
    if(value=='cargando...'){
      return value;
    }
    return new Intl.NumberFormat('en-US').format(value);
  }

  return (
    <div id="CotizadorComponent" className="w-full">
      <div className="max-w-[1200px] mx-auto p-4 flex items-center">
        <div className="md:w-[50%] w-full p-4 self-stretch border rounded-md">
          <div>
            <label htmlFor="inversion" className="text-[#999999]">Inversion</label>
            <div className="w-full h-full rounded-md border border-1 border-[#999999] flex">
              <div className="bg-[#1a1a1a] rounded-s-md h-full p-2 text-[#ff9332] font-semibold">USD $</div>
              <div className="flex-1 p-1">
                <input type="text" className="w-full h-full bg-black outline-none text-white pl-2 font-bold text-lg" placeholder="0" onChange={hadleChange} onKeyDown={(e) => {
                  if(isNaN(e.key) && e.keyCode!=8 && e.keyCode!=37 && e.keyCode!=39 && e.keyCode!=46 && e.key!='.'){
                    e.preventDefault();
                  }
                }} autoFocus />
              </div>

            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="inversion" className="text-[#999999]">Bitcoin</label>
            <div className="flex">
              <div className="w-full h-full rounded-md border border-1 border-[#999999] flex">
                <div className="bg-[#1a1a1a] rounded-s-md h-full p-2">
                  <img src="/bitcoin.png" alt="logo bitcoin" />
                </div>
                <div className="flex-1 p-1">
                  <input type="text" className="w-full h-full bg-black outline-none text-white pl-2 font-bold text-lg" placeholder="0" readOnly value={formatCurrencyWithOutFixed(priceBitcoin)} />
                </div>
              </div>
              <div className="w-full self-stretch rounded-md border border-1 border-[#999999] flex ml-2">
                <div className="flex-1 p-1">
                  <input type="text" className="w-full h-full bg-black outline-none text-white pl-2 font-bold text-lg" placeholder="0" readOnly value={formatCurrency(qtyBitcoin)} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="inversion" className="text-[#999999]">Ethereum</label>
            <div className="flex">
              <div className="w-full h-full rounded-md border border-1 border-[#999999] flex">
                <div className="bg-[#1a1a1a] rounded-s-md h-full p-2">
                  <img src="/ethereum.png" alt="logo ethereum" />
                </div>
                <div className="flex-1 p-1">
                  <input type="text" className="w-full h-full bg-black outline-none text-white pl-2 font-bold text-lg" placeholder="0" readOnly value={formatCurrencyWithOutFixed(priceEthereum)} />
                </div>
              </div>
              <div className="w-full self-stretch rounded-md border border-1 border-[#999999] flex ml-2">
                <div className="flex-1 p-1">
                  <input type="text" className="w-full h-full bg-black outline-none text-white pl-2 font-bold text-lg" placeholder="0" readOnly value={formatCurrency(qtyEthereum)} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="inversion" className="text-[#999999]">Cardano</label>
            <div className="flex">
              <div className="w-full h-full rounded-md border border-1 border-[#999999] flex">
                <div className="bg-[#1a1a1a] rounded-s-md h-full p-2">
                  <img src="/cardano.png" alt="logo cardano" />
                </div>
                <div className="flex-1 p-1">
                  <input type="text" className="w-full h-full bg-black outline-none text-white pl-2 font-bold text-lg" placeholder="0" readOnly value={formatCurrencyWithOutFixed(priceCardano)} />
                </div>
              </div>
              <div className="w-full self-stretch rounded-md border border-1 border-[#999999] flex ml-2">
                <div className="flex-1 p-1">
                  <input type="text" className="w-full h-full bg-black outline-none text-white pl-2 font-bold text-lg" placeholder="0" readOnly value={formatCurrency(qtyCardano)} />
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="md:w-[50%] w-full border ml-2 p-4 rounded-md self-stretch">
          <h2 className="text-white text-center font-semibold text-lg">
            Resultado de la Inversion
          </h2>      
          <div className="flex justify-center mt-2">
                <button onClick={(e)=>setMonths(months-1)} className="border-0 outline-0 bg-[#ff9332] text-black mr-2 px-2 font-bold text-3x flex justify-center items-center w-[30px] rounded"> - </button>
                <span className="text-white text-lg font-semibold">
                  { months } (meses)
                </span>
                <button onClick={(e)=>setMonths(months+1)} className="border-0 outline-0 bg-[#ff9332] text-black ml-2 px-2 font-bold text-3x flex justify-center items-center w-[30px] rounded-md"> + </button>
          </div>
          <div className="mt-4">
            <span className="text-[#999999] flex mb-2">
              <img src="/bitcoin.png" alt="logo bitcoin" className="mr-2" /> 
              Beneficio/Perdida Bitcoin
            </span>
            <div className="bg-[rgba(48,209,88,0.15)] text-[#6ccf59] rounded-md h-full p-2 flex justify-between">
              <div>
                Ganancia: USD ${ formatCurrency(revenue.btc.amount) }
                <br />
                Retorno: USD ${ formatCurrency(revenue.btc.total) }
              </div>
              <div>
                Bitcoins: { formatCurrency(revenue.btc.change) }
              </div>
                
            </div>
          </div> 
          <div className="mt-4">
            <span className="text-[#999999] flex mb-2">
              <img src="/ethereum.png" alt="logo ethereum" className="mr-2" />
              Beneficio/Perdida Ethereum
            </span>
            <div className="bg-[rgba(48,209,88,0.15)] text-[#6ccf59] rounded-md h-full p-2 flex justify-between">
              <div>
                Ganancia: USD ${ formatCurrency(revenue.etc.amount) }
                <br />
                Retorno: USD ${ formatCurrency(revenue.etc.total) }
              </div>
              <div>
                Ethereums: { formatCurrency(revenue.etc.change) }
              </div>
            </div>
          </div> 
          <div className="mt-4">
            <span className="text-[#999999] flex mb-2">
              <img src="/cardano.png" alt="logo cardano" className="mr-2" />
              Beneficio/Perdida Cardano
            </span>
            <div className="bg-[rgba(48,209,88,0.15)] text-[#6ccf59] rounded-md h-full p-2 flex justify-between">
              <div>
                Ganancia: USD ${ formatCurrency(revenue.ada.amount) }
                <br />
                Retorno: USD ${ formatCurrency(revenue.ada.total) }
              </div>
              <div>
                Cardanos: { formatCurrency(revenue.ada.change) }
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default CotizadorComponent