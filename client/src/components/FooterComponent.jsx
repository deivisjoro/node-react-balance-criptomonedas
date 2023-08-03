const FooterComponent = () => {
  return (
    <div id="FooterComponent" className="w-full bg-[#333333] text-sm text-gray-400 h-[40px] flex items-center">
        <div className="max-w-[1200px] mx-auto p-4 flex items-center justify-center">
            &copy; All rights reserved - @deivisjoro -  { new Date().getFullYear() }
        </div>
    </div>
  )
}

export default FooterComponent