import React from 'react'

const Navbar = () => {
  return (
    <nav
      className="fixed top-5 left-1/2 -translate-x-1/2 w-[70%] max-w-[900px] h-14 z-[100]
                 flex items-center justify-between px-7
                 bg-[rgba(5,10,48,0.45)] backdrop-blur-[18px]
                 border border-white/[0.08] rounded-2xl
                 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]
                 transition-all duration-300
                 hover:bg-[rgba(5,10,48,0.6)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      {/* Brand / Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="text-xl drop-shadow-[0_0_6px_rgba(251,165,89,0.4)] animate-[float_3s_ease-in-out_infinite]">
          ☁️
        </span>
        <span className="font-[NeuMachina] text-lg font-semibold tracking-wide text-white">
          Cloudy<span className="text-[#FBA559]">Bites</span>
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-2">
        {['Menu', 'About Us', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            className="relative px-4 py-2 text-white/65 text-sm font-medium tracking-wide
                       rounded-[10px] no-underline
                       transition-all duration-250
                       hover:text-white hover:bg-white/[0.06]
                       after:content-[''] after:absolute after:bottom-1 after:left-1/2
                       after:-translate-x-1/2 after:w-[60%] after:h-0.5
                       after:bg-gradient-to-r after:from-transparent after:via-[#FBA559] after:to-transparent
                       after:rounded-sm after:scale-x-0 after:transition-transform after:duration-300
                       hover:after:scale-x-100"
          >
            {item}
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="#order"
        className="flex items-center gap-2 px-6 py-2.5
                   text-[#050A30]
                   text-xs font-semibold tracking-widest uppercase no-underline
                   bg-gradient-to-br from-[#FBA559] to-[#FFB347] rounded-[10px]
                   shadow-[0_4px_16px_rgba(251,165,89,0.3)]
                   transition-all duration-250 cursor-pointer
                   hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(251,165,89,0.45)] hover:brightness-105
                   active:translate-y-0 active:shadow-[0_2px_8px_rgba(251,165,89,0.3)]"
      >
        {/* Pulsing green dot */}
        <span className="w-[7px] h-[7px] bg-[#34D399] rounded-full 
                         shadow-[0_0_6px_rgba(52,211,153,0.6)]
                         animate-[pulse-dot_2s_ease-in-out_infinite]" />
        Order Now
      </a>
    </nav>
  )
}

export default Navbar