const HeaderComponent = () => {
  return (
    <div id="HeaderComponent" className="w-full fixed z-50 h-[65px]">
        
      <div id="MainHeader" className="w-full bg-[#0d0d0d] flex items-center shadow-md shadow-[0_1px_0_0_rgba(255,255,255,0.1)]">
        <div className="flex justify-between gap-10 max-w-[1200px] w-full px-3 py-3 mx-auto items-center">
          <div className="flex items-center w-[200px]">
            <a href="" className="mr-1">
                <img src="/cryptocurrency.png" alt="logo cryptocurrency" />
            </a>  
            <span className="text-white text-lg">
              Crypto<span className="font-bold">Stats</span> 
            </span>      
          </div>
          

          <div className="w-full flex items-center pr-2 md:flex">
            <nav id="MainMenu" className="w-full flex items-center justify-end px-2">
              <ul className="flex items-center text-sm font-semibold text-white">                      
                <li className="mx-2 cursor-pointer hover:text-[#ff9332]">Ayuda</li>   
                <li className="mx-2 cursor-pointer">
                  <button className="rounded-md p-2 bg-[#ff9332] text-black shadow-md shadow-[1px_2px_0_0_rgba(255,255,255,0.1)] hover:bg-[#c09332]">
                    Iniciar Sesion
                  </button>
                </li>                     
              </ul>                    
            </nav>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HeaderComponent