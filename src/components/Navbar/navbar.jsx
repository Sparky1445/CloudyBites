import React from 'react'

const Navbar = () => {
  return (
    <nav 
      className="fixed top-8 left-1/2 -translate-x-1/2 w-max min-w-[350px] md:min-w-[760px] z-[50] 
                 flex items-center justify-between p-2 pl-6 md:pl-8
                 bg-[transparent] backdrop-blur-md rounded-full 
                 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border border-white/[0.04]"
    >
      {/* Brand / Logo */}
      <div className="flex-1 flex justify-start cursor-pointer">
        <span className=" font-serif italic text-2xl md:text-[28px] font-semibold tracking-tight text-[#f4f4f5]">
          Cloudy.
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center justify-center gap-10">
        {['Menu', 'About Us', 'Reviews'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            className="text-[#b4aaaa] hover:text-white transition-colors text-[14px] font-medium tracking-wide no-underline"
          >
            {item}
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex-1 flex justify-end">
        <a
          href="#order"
          className=" pl-4 bg-[#f4f4f5] text-[#111] px-6 md:px-7 py-2.5 md:py-3 rounded-full text-[13px] md:text-[14px] font-semibold tracking-wide
                     transition-transform hover:scale-105 active:scale-95 no-underline shadow-sm"
        >
          Order Now
        </a>
      </div>
    </nav>
  )
}

export default Navbar