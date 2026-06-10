import { useEffect, useState } from 'react'
import navbarScroll from "../../GSAP/navbarScroll.js"
import { WHATSAPP_NUMBER } from "../../config.js"

const NAV_ITEMS = ['Menu', 'About Us', 'Reviews'];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) navbarScroll();
  }, []);

  const scrollTo = (item) => {
    const id = item.toLowerCase().replace(' ', '-');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <nav
        className="navbar fixed top-2 md:top-8 left-1/2 -translate-x-1/2 w-max min-w-[220px] md:min-w-[810px] h-[36px] md:h-[45px] z-[50]
                   flex items-center justify-between
                   bg-[transparent] backdrop-blur-md rounded-full
                   shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border border-white/[0.04]"
      >
        {/* Logo */}
        <div className="navbarLogo flex-shrink-0 pl-5 cursor-pointer">
          <span className="font-serif italic text-base md:text-[28px] font-semibold tracking-tight text-[#f4f4f5]">
            CloudyBites.
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center justify-center gap-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-[beige] hover:text-[white] transition-colors text-[14px] font-medium tracking-wide bg-transparent border-none cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Desktop Order Now */}
        <div className="hidden md:flex flex-shrink-0 pr-1">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="navbarOrderNow w-[120px] text-center h-[30px] bg-gradient-to-r from-[#5B9BD5] to-[#2E75B6] text-white px-7 py-3 rounded-[50px] text-[14px] font-semibold tracking-wide transition-transform hover:scale-105 active:scale-95 no-underline shadow-[0_4px_15px_rgba(46,117,182,0.35)]"
          >
            <p className="transform translate-y-[5px]">Order Now</p>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-[5px] pr-4 pl-4 w-12 h-full cursor-pointer bg-transparent border-none"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-[#f4f4f5] origin-center transition-all duration-300 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#f4f4f5] transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#f4f4f5] origin-center transition-all duration-300 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden fixed top-[84px] left-1/2 -translate-x-1/2 z-[49] w-[260px]
                    backdrop-blur-md bg-[rgba(11,29,58,0.90)] rounded-2xl
                    border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]
                    transition-all duration-300 ease-out overflow-hidden
                    ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <div className="flex flex-col py-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-[#EBF5FB] text-[15px] font-medium tracking-wide px-6 py-3.5 text-left bg-transparent border-none cursor-pointer hover:bg-white/10 transition-colors w-full"
            >
              {item}
            </button>
          ))}
          <div className="mx-5 my-2 h-px bg-white/10" />
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mx-4 mb-3 text-center bg-gradient-to-r from-[#5B9BD5] to-[#2E75B6] text-white py-2.5 rounded-full text-[14px] font-semibold tracking-wide no-underline"
          >
            Order Now
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
